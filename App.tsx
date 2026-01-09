import { useState, useEffect, useRef } from "react"
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl, Animated, Alert, Share, Modal, FlatList, Switch, Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Notifications from "expo-notifications"
import { Audio } from "expo-av"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Accelerometer } from "expo-sensors"
import { getWordDefinition, type WordDefinition } from "./wordDefinitions"

interface Verse {
  text: string
  reference: string
}

interface SavedVerse extends Verse {
  id: string
  savedAt: number
}

type Screen = "home" | "favorites" | "settings"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export default function App() {
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [favorites, setFavorites] = useState<SavedVerse[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [notificationTime, setNotificationTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [musicTrack, setMusicTrack] = useState("sp1")
  const [backgroundColor, setBackgroundColor] = useState("#4a7c7e")
  const [bibleVersion, setBibleVersion] = useState("kjv")
  const [wordDefinitionsEnabled, setWordDefinitionsEnabled] = useState(true)
  const [selectedWordDef, setSelectedWordDef] = useState<WordDefinition | null>(null)
  const [showWordModal, setShowWordModal] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    loadFavorites()
    loadNotificationSettings()
    requestNotificationPermissions()
    checkAndUpdateStreak()
    loadMusicSettings()
    loadBackgroundColor()
    loadBibleVersion()

    // Set up shake detection
    let lastShake = 0
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData
      const acceleration = Math.sqrt(x * x + y * y + z * z)
      const now = Date.now()

      // Detect shake (threshold > 2.5g and debounce 1 second)
      if (acceleration > 2.5 && now - lastShake > 1000) {
        lastShake = now
        handleNewVerse()
      }
    })

    Accelerometer.setUpdateInterval(100)

    return () => {
      subscription.remove()
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [])

  useEffect(() => {
    if (loading && !refreshing) {
      // Create pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          })
        ])
      ).start()
    } else {
      pulseAnim.setValue(1)
    }
  }, [loading, refreshing])

  useEffect(() => {
    checkIfFavorite()
  }, [verse, favorites])

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("@favorites")
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    }
  }

  const loadNotificationSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem("@notificationsEnabled")
      setNotificationsEnabled(enabled === "true")

      const savedTime = await AsyncStorage.getItem("@notificationTime")
      if (savedTime) {
        const [hours, minutes] = savedTime.split(":").map(Number)
        const time = new Date()
        time.setHours(hours, minutes, 0, 0)
        setNotificationTime(time)
      } else {
        const defaultTime = new Date()
        defaultTime.setHours(8, 0, 0, 0)
        setNotificationTime(defaultTime)
      }
    } catch (error) {
      console.error("Failed to load notification settings:", error)
    }
  }

  const checkAndUpdateStreak = async () => {
    try {
      const today = new Date().toDateString()
      const lastVisit = await AsyncStorage.getItem("@lastVisitDate")
      const storedStreak = await AsyncStorage.getItem("@currentStreak")
      let streak = storedStreak ? parseInt(storedStreak) : 0

      if (lastVisit) {
        const lastVisitDate = new Date(lastVisit)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        if (lastVisit === today) {
          // Already visited today, keep streak
          setCurrentStreak(streak)
        } else if (lastVisitDate.toDateString() === yesterday.toDateString()) {
          // Visited yesterday, increment streak
          streak += 1
          await AsyncStorage.setItem("@currentStreak", streak.toString())
          await AsyncStorage.setItem("@lastVisitDate", today)
          setCurrentStreak(streak)
        } else {
          // Streak broken, reset to 1
          streak = 1
          await AsyncStorage.setItem("@currentStreak", "1")
          await AsyncStorage.setItem("@lastVisitDate", today)
          setCurrentStreak(1)
        }
      } else {
        // First visit
        streak = 1
        await AsyncStorage.setItem("@currentStreak", "1")
        await AsyncStorage.setItem("@lastVisitDate", today)
        setCurrentStreak(1)
      }
    } catch (error) {
      console.error("Failed to update streak:", error)
    }
  }

  const loadMusicSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem("@musicEnabled")
      const track = await AsyncStorage.getItem("@musicTrack")

      if (track) {
        setMusicTrack(track)
      }

      if (enabled === "true") {
        setMusicEnabled(true)
        await playBackgroundMusic()
      }
    } catch (error) {
      console.error("Failed to load music settings:", error)
    }
  }

  const loadBackgroundColor = async () => {
    try {
      const savedColor = await AsyncStorage.getItem("@backgroundColor")
      if (savedColor) {
        setBackgroundColor(savedColor)
      }
    } catch (err) {
      console.log("Failed to load background color", err)
    }
  }

  const saveBackgroundColor = async (color: string) => {
    try {
      await AsyncStorage.setItem("@backgroundColor", color)
      setBackgroundColor(color)
    } catch (err) {
      console.log("Failed to save background color", err)
    }
  }

  const loadBibleVersion = async () => {
    try {
      const savedVersion = await AsyncStorage.getItem("@bibleVersion")
      if (savedVersion) {
        setBibleVersion(savedVersion)
      }
    } catch (err) {
      console.log("Failed to load bible version", err)
    }
  }

  const saveBibleVersion = async (version: string) => {
    try {
      await AsyncStorage.setItem("@bibleVersion", version)
      setBibleVersion(version)
      // Fetch new verse with new version
      fetchVerse()
    } catch (err) {
      console.log("Failed to save bible version", err)
    }
  }

  const handleMusicTrackChange = async (track: string) => {
    try {
      // Stop current sound if playing
      if (sound) {
        await sound.stopAsync()
        await sound.unloadAsync()
        setSound(null)
      }

      // Update selected track
      setMusicTrack(track)
      await AsyncStorage.setItem("@musicTrack", track)

      // Play new track immediately
      if (musicEnabled) {
        await playBackgroundMusic(track)
      }
    } catch (err) {
      console.log("Failed to change music track", err)
    }
  }

  const playBackgroundMusic = async (trackOverride?: string) => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false
      })

      // Use provided track or fall back to state
      const trackToPlay = trackOverride || musicTrack

      // Map track IDs to audio files
      const audioFiles: Record<string, any> = {
        sp1: require("./assets/audio/sp1.mp3"),
        swl1: require("./assets/audio/swl1.mp3"),
        zs1: require("./assets/audio/zs1.mp3")
      }

      const selectedAudio = audioFiles[trackToPlay]
      const { sound: newSound } = await Audio.Sound.createAsync(selectedAudio, { shouldPlay: true, isLooping: true, volume: 0.3 })
      setSound(newSound)
    } catch (error) {
      console.log("Failed to load background music:", error)
      setMusicEnabled(false)
      await AsyncStorage.setItem("@musicEnabled", "false")
      Alert.alert("Music Unavailable", "Unable to load background music. Please try again.")
    }
  }

  const toggleMusic = async (value: boolean) => {
    try {
      await AsyncStorage.setItem("@musicEnabled", value.toString())
      setMusicEnabled(value)

      if (value) {
        await playBackgroundMusic()
      } else {
        if (sound) {
          await sound.stopAsync()
          await sound.unloadAsync()
          setSound(null)
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to toggle music")
    }
  }

  const requestNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      console.log("Notification permissions not granted")
    }
  }

  const checkIfFavorite = () => {
    if (!verse) {
      setIsFavorite(false)
      return
    }
    const exists = favorites.some(fav => fav.reference === verse.reference && fav.text === verse.text)
    setIsFavorite(exists)
  }

  const toggleFavorite = async () => {
    if (!verse) return

    try {
      let updatedFavorites: SavedVerse[]

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = favorites.filter(fav => !(fav.reference === verse.reference && fav.text === verse.text))
      } else {
        // Add to favorites
        const newFavorite: SavedVerse = {
          ...verse,
          id: Date.now().toString(),
          savedAt: Date.now()
        }
        updatedFavorites = [newFavorite, ...favorites]
      }

      await AsyncStorage.setItem("@favorites", JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)
    } catch (error) {
      Alert.alert("Error", "Failed to update favorites")
    }
  }

  const deleteFavorite = async (id: string) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== id)
      await AsyncStorage.setItem("@favorites", JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)
    } catch (error) {
      Alert.alert("Error", "Failed to delete favorite")
    }
  }

  const toggleNotifications = async (value: boolean) => {
    try {
      // Check permissions first
      const { status } = await Notifications.getPermissionsAsync()
      if (status !== "granted" && value) {
        const { status: newStatus } = await Notifications.requestPermissionsAsync()
        if (newStatus !== "granted") {
          Alert.alert("Permission Required", "Please enable notifications in your device settings to receive daily verses.")
          return
        }
      }

      await AsyncStorage.setItem("@notificationsEnabled", value.toString())
      setNotificationsEnabled(value)

      if (value) {
        await scheduleDailyNotification()
        const hours = notificationTime.getHours()
        const minutes = notificationTime.getMinutes()
        const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
        Alert.alert("Enabled", `You'll receive a daily verse at ${timeStr}`)
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync()
        Alert.alert("Disabled", "Daily notifications have been turned off")
      }
    } catch (error) {
      console.error("Notification error:", error)
      Alert.alert("Note", "Notifications are not fully supported in Expo Go. They will work when you build the app.")
    }
  }

  const scheduleDailyNotification = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()

      const hours = notificationTime.getHours()
      const minutes = notificationTime.getMinutes()

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Daily Verse 📖",
          body: "Your daily inspiration is ready",
          sound: true
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
          repeats: true,
          channelId: "daily-verse"
        }
      })
    } catch (error) {
      console.log("Notification scheduling not available in Expo Go:", error)
    }
  }

  const handleTimeChange = async (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === "ios")
    if (selectedDate) {
      setNotificationTime(selectedDate)
      const hours = selectedDate.getHours()
      const minutes = selectedDate.getMinutes()
      const timeString = `${hours}:${minutes}`
      await AsyncStorage.setItem("@notificationTime", timeString)

      if (notificationsEnabled) {
        await scheduleDailyNotification()
      }
    }
  }

  const fetchVerse = async () => {
    try {
      setLoading(true)
      setError(null)

      // Misty fade out - fade and shrink
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true
        })
      ]).start()

      try {
        const response = await fetch(`https://bible-api.com/?random=verse&translation=${bibleVersion}`)

        if (!response.ok) {
          throw new Error("Primary API failed")
        }

        const data = await response.json()

        setVerse({
          text: data.text.trim(),
          reference: data.reference
        })
      } catch (primaryErr) {
        // Fallback to bible.org API
        const fallbackResponse = await fetch("https://labs.bible.org/api/?passage=random&type=json")

        if (!fallbackResponse.ok) {
          throw new Error("Failed to fetch verse from both APIs")
        }

        const fallbackData = await fallbackResponse.json()
        const verseData = fallbackData[0]

        setVerse({
          text: verseData.text.trim(),
          reference: `${verseData.bookname} ${verseData.chapter}:${verseData.verse}`
        })
      }

      // Misty fade in - ethereal appearance with gentle scale and fade
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true
        })
      ]).start()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchVerse()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchVerse()
  }

  const handleNewVerse = () => {
    fetchVerse()
  }

  const handleWordTap = (word: string) => {
    if (!wordDefinitionsEnabled) return

    const definition = getWordDefinition(word)
    if (definition) {
      setSelectedWordDef(definition)
      setShowWordModal(true)
    }
  }

  const renderVerseWithTappableWords = (text: string) => {
    if (!wordDefinitionsEnabled) {
      return <Text style={styles.verseText}>"{text}"</Text>
    }

    const words = text.split(/(\s+)/)

    return (
      <Text style={styles.verseText}>
        "
        {words.map((word, index) => {
          const cleanWord = word.replace(/[.,;:!?"']/g, "")
          const definition = getWordDefinition(cleanWord)

          if (definition && cleanWord.length > 0) {
            return (
              <Text key={index} style={styles.tappableWord} onPress={() => handleWordTap(cleanWord)}>
                {word}
              </Text>
            )
          }
          return <Text key={index}>{word}</Text>
        })}
        "
      </Text>
    )
  }

  const handleShare = async () => {
    if (!verse) return

    const shareText = `"${verse.text}"\n\n— ${verse.reference}\n\n(from LuminaVerse app)`

    try {
      await Share.share({
        message: shareText,
        title: "Bible Verse"
      })
    } catch (error) {
      console.error("Error sharing:", error)
      Alert.alert("Error", "Failed to share verse")
    }
  }

  const renderHome = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" colors={["#fff"]} />}>
      {/* Logo and Header */}
      <View style={styles.header}>
        <Feather name="book-open" size={32} color="rgba(255, 255, 255, 0.9)" />
        <Text style={styles.title}>LuminaVerse</Text>
        {currentStreak > 0 && (
          <View style={styles.streakBadge}>
            <Feather name="zap" size={16} color="#FFD700" />
            <Text style={styles.streakText}>
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </Text>
          </View>
        )}
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Verse Container */}
      <View style={styles.verseContainer}>
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Feather name="book-open" size={48} color="rgba(255, 255, 255, 0.6)" />
            </Animated.View>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleNewVerse}>
              <Text style={styles.tryAgainText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : verse ? (
          <ScrollView style={styles.verseScrollView} contentContainerStyle={styles.verseScrollContent} showsVerticalScrollIndicator={false}>
            <Animated.View style={[styles.verseContent, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
              {renderVerseWithTappableWords(verse.text)}
              <View style={styles.referenceContainer}>
                <Text style={styles.referenceText}>{verse.reference}</Text>
                {wordDefinitionsEnabled && <Feather name="book" size={14} color="rgba(255, 255, 255, 0.5)" style={{ marginLeft: 6 }} />}
              </View>
              <Text style={styles.versionBadge}>{bibleVersion.toUpperCase()}</Text>
            </Animated.View>
          </ScrollView>
        ) : null}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.iconButton, !verse && styles.buttonDisabled]} onPress={toggleFavorite} disabled={!verse}>
            <Feather name={isFavorite ? "heart" : "heart"} size={20} color={isFavorite ? "#ff6b6b" : "rgba(255, 255, 255, 0.9)"} style={isFavorite ? { fill: "#ff6b6b" } : {}} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.mainButton, loading && styles.buttonDisabled]} onPress={handleNewVerse} disabled={loading}>
            <Feather name="refresh-cw" size={20} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.buttonText}>New Verse</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.iconButton, !verse && styles.buttonDisabled]} onPress={handleShare} disabled={!verse}>
            <Feather name="share-2" size={20} color="rgba(255, 255, 255, 0.9)" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )

  const renderFavorites = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Favorites</Text>
        <Text style={styles.screenSubtitle}>
          {favorites.length} saved verse{favorites.length !== 1 ? "s" : ""}
        </Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="heart" size={48} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon to save verses</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.favoritesList}
          renderItem={({ item }) => (
            <View style={styles.favoriteCard}>
              <View style={styles.favoriteContent}>
                <Text style={styles.favoriteText}>"{item.text}"</Text>
                <Text style={styles.favoriteReference}>{item.reference}</Text>
              </View>
              <View style={styles.favoriteActions}>
                <TouchableOpacity
                  onPress={() => {
                    Share.share({
                      message: `"${item.text}"\n\n— ${item.reference}`,
                      title: "Bible Verse"
                    })
                  }}
                  style={styles.favoriteActionButton}
                >
                  <Feather name="share-2" size={18} color="rgba(255, 255, 255, 0.7)" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Delete Favorite", "Remove this verse from favorites?", [
                      { text: "Cancel", style: "cancel" },
                      { text: "Delete", style: "destructive", onPress: () => deleteFavorite(item.id) }
                    ])
                  }}
                  style={styles.favoriteActionButton}
                >
                  <Feather name="trash-2" size={18} color="rgba(255, 100, 100, 0.8)" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )

  const renderSettings = () => (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.aboutContent}>
      <View style={styles.screenHeader}>
        <Feather name="settings" size={32} color="rgba(255, 255, 255, 0.9)" />
        <Text style={styles.screenTitle}>Settings</Text>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Daily Notifications</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Daily Verse Reminder</Text>
            <Text style={styles.settingDescription}>
              {notificationTime.getHours().toString().padStart(2, "0")}:{notificationTime.getMinutes().toString().padStart(2, "0")}
            </Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} trackColor={{ false: "rgba(255,255,255,0.2)", true: "#81b0ff" }} thumbColor={notificationsEnabled ? "#4a7c7e" : "#f4f3f4"} />
        </View>
        {notificationsEnabled && (
          <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowTimePicker(true)}>
            <Feather name="clock" size={18} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.timePickerButtonText}>Change Time</Text>
          </TouchableOpacity>
        )}
        {showTimePicker && <DateTimePicker value={notificationTime} mode="time" is24Hour={false} display="default" onChange={handleTimeChange} />}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Background Music</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Meditation Music</Text>
          </View>
          <Switch value={musicEnabled} onValueChange={toggleMusic} trackColor={{ false: "rgba(255,255,255,0.2)", true: "#81b0ff" }} thumbColor={musicEnabled ? "#4a7c7e" : "#f4f3f4"} />
        </View>
        {musicEnabled && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.aboutText}>Select track:</Text>
            {[
              { id: "sp1", name: "Spiritual Piano", emoji: "🎹" },
              { id: "swl1", name: "Soft Worship", emoji: "🙏" },
              { id: "zs1", name: "Zen Strings", emoji: "🎻" }
            ].map(track => (
              <TouchableOpacity key={track.id} style={[styles.musicTrackButton, musicTrack === track.id && styles.musicTrackButtonActive]} onPress={() => handleMusicTrackChange(track.id)}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Text style={{ fontSize: 20, marginRight: 10 }}>{track.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.musicTrackName, musicTrack === track.id && styles.musicTrackNameActive]}>{track.name}</Text>
                    {musicTrack === track.id && <Text style={styles.nowPlayingText}>♪ Now Playing</Text>}
                  </View>
                </View>
                {musicTrack === track.id && <Feather name="volume-2" size={18} color="#4a7c7e" />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Bible Version</Text>
        <Text style={styles.aboutText}>Choose your preferred translation:</Text>
        <View style={styles.versionGrid}>
          {[
            { id: "kjv", name: "King James" },
            { id: "web", name: "World English" },
            { id: "asv", name: "American Standard" },
            { id: "bbe", name: "Basic English" }
          ].map(version => (
            <TouchableOpacity key={version.id} style={[styles.versionOption, bibleVersion === version.id && styles.versionOptionSelected]} onPress={() => saveBibleVersion(version.id)}>
              <Text style={[styles.versionOptionText, bibleVersion === version.id && styles.versionOptionTextSelected]}>{version.name}</Text>
              {bibleVersion === version.id && <Feather name="check" size={18} color="#fff" style={{ marginLeft: 8 }} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Word Definitions</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Hebrew & Greek Words</Text>
            <Text style={styles.settingDescription}>Tap words to see original meanings</Text>
          </View>
          <Switch value={wordDefinitionsEnabled} onValueChange={setWordDefinitionsEnabled} trackColor={{ false: "rgba(255,255,255,0.2)", true: "#81b0ff" }} thumbColor={wordDefinitionsEnabled ? "#4a7c7e" : "#f4f3f4"} />
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Background Color</Text>
        <Text style={styles.aboutText}>Choose your preferred app theme color:</Text>
        <View style={styles.colorGrid}>
          {[
            { name: "Teal", color: "#4a7c7e" },
            { name: "Ocean", color: "#2c3e50" },
            { name: "Purple", color: "#6c5ce7" },
            { name: "Forest", color: "#27ae60" },
            { name: "Sunset", color: "#e17055" },
            { name: "Navy", color: "#34495e" },
            { name: "Plum", color: "#8e44ad" },
            { name: "Sage", color: "#7d8a7f" }
          ].map(item => (
            <TouchableOpacity key={item.color} style={[styles.colorOption, { backgroundColor: item.color }, backgroundColor === item.color && styles.colorOptionSelected]} onPress={() => saveBackgroundColor(item.color)}>
              {backgroundColor === item.color && <Feather name="check" size={20} color="#fff" />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Your Progress</Text>
        <View style={styles.streakCard}>
          <Feather name="zap" size={32} color="#FFD700" />
          <Text style={styles.streakCardNumber}>{currentStreak}</Text>
          <Text style={styles.streakCardLabel}>Day Streak</Text>
          <Text style={styles.streakCardDescription}>Keep visiting daily to maintain your streak!</Text>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>About LuminaVerse</Text>
        <Text style={styles.aboutText}>LuminaVerse provides daily inspiration through randomly selected Bible verses. Experience scripture in a beautiful, distraction-free interface.</Text>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>Content Attribution</Text>
        <Text style={styles.aboutText}>Bible verses are provided by:</Text>
        <Text style={styles.aboutText}>• bible-api.com</Text>
        <Text style={styles.aboutText}>• labs.bible.org</Text>
        <Text style={styles.aboutTextSmall}>Scripture quotations are from public domain translations.</Text>
        <Text style={[styles.aboutText, { marginTop: 8 }]}>Background music by:</Text>
        <Text style={styles.aboutText}>• Pixabay Audio Library</Text>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.aboutSectionTitle}>App Info</Text>
        <Text style={styles.aboutText}>Version 1.0.0</Text>
        <Text style={styles.aboutText}>© 2026 Labazine</Text>
      </View>

      <TouchableOpacity onPress={() => Alert.alert("Privacy Policy", "LuminaVerse is privacy-first. We do not collect, store, or share any personal data.\n\nAll your favorites, streaks, and settings are stored only on your device.\n\nFor full details, visit:\nhttps://spowers2.github.io/luminaverse", [{ text: "OK" }])} style={styles.supportButton}>
        <Feather name="shield" size={20} color="rgba(255, 255, 255, 0.9)" />
        <Text style={styles.supportButtonText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert("Contact Support", "Need help or have feedback?\n\nEmail us at:\nsupport@labazine.com\n\nWe'd love to hear from you!", [{ text: "OK" }])} style={styles.supportButton}>
        <Feather name="mail" size={20} color="rgba(255, 255, 255, 0.9)" />
        <Text style={styles.supportButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  )

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style="light" />

      {currentScreen === "home" && renderHome()}
      {currentScreen === "favorites" && renderFavorites()}
      {currentScreen === "settings" && renderSettings()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen("home")}>
          <Feather name="home" size={24} color={currentScreen === "home" ? "#fff" : "rgba(255, 255, 255, 0.5)"} />
          <Text style={[styles.navLabel, currentScreen === "home" && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen("favorites")}>
          <Feather name="heart" size={24} color={currentScreen === "favorites" ? "#fff" : "rgba(255, 255, 255, 0.5)"} />
          <Text style={[styles.navLabel, currentScreen === "favorites" && styles.navLabelActive]}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen("settings")}>
          <Feather name="settings" size={24} color={currentScreen === "settings" ? "#fff" : "rgba(255, 255, 255, 0.5)"} />
          <Text style={[styles.navLabel, currentScreen === "settings" && styles.navLabelActive]}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Word Definition Modal */}
      <Modal visible={showWordModal} transparent={true} animationType="slide" onRequestClose={() => setShowWordModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowWordModal(false)}>
          <View style={styles.wordModalContainer}>
            <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
              <View style={styles.wordModalContent}>
                <View style={styles.wordModalHeader}>
                  <View>
                    <Text style={styles.wordModalTitle}>{selectedWordDef?.word.toUpperCase()}</Text>
                    <Text style={styles.wordModalOriginal}>{selectedWordDef?.original}</Text>
                    <Text style={styles.wordModalTranslit}>{selectedWordDef?.transliteration}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowWordModal(false)}>
                    <Feather name="x" size={24} color="rgba(255, 255, 255, 0.8)" />
                  </TouchableOpacity>
                </View>

                <View style={styles.wordModalDivider} />

                <Text style={styles.wordModalStrongsLabel}>Strong's: {selectedWordDef?.strongsNumber}</Text>

                <ScrollView style={styles.wordModalScroll} showsVerticalScrollIndicator={false}>
                  <Text style={styles.wordModalDefinition}>{selectedWordDef?.definition}</Text>

                  {selectedWordDef?.etymology && (
                    <>
                      <Text style={styles.wordModalEtymologyLabel}>Etymology</Text>
                      <Text style={styles.wordModalEtymology}>{selectedWordDef.etymology}</Text>
                    </>
                  )}
                </ScrollView>

                <TouchableOpacity style={styles.wordModalCloseButton} onPress={() => setShowWordModal(false)}>
                  <Text style={styles.wordModalCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a7c7e"
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 48,
    paddingBottom: 100,
    justifyContent: "space-between"
  },
  header: {
    alignItems: "center",
    gap: 12,
    paddingTop: 16
  },
  title: {
    fontFamily: "System",
    fontSize: 22,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#fff"
  },
  separator: {
    width: 96,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 48
  },
  verseContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  verseScrollView: {
    flex: 1,
    width: "100%"
  },
  verseScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20
  },
  verseContent: {
    width: "100%"
  },
  verseText: {
    fontFamily: "System",
    fontSize: 26,
    fontWeight: "400",
    lineHeight: 38,
    textAlign: "center",
    color: "#fff",
    marginBottom: 24
  },
  referenceText: {
    fontFamily: "System",
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0.3,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)"
  },
  errorContainer: {
    alignItems: "center"
  },
  errorText: {
    fontFamily: "System",
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
    textAlign: "center"
  },
  tryAgainText: {
    fontFamily: "System",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textDecorationLine: "underline"
  },
  buttonContainer: {
    gap: 16,
    paddingBottom: 32,
    paddingHorizontal: 16
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "visible"
  },
  mainButton: {
    flex: 1
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  shareButton: {
    marginTop: 0
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    fontFamily: "System",
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)"
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4
  },
  navLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500"
  },
  navLabelActive: {
    color: "#fff"
  },
  screenContainer: {
    flex: 1,
    paddingBottom: 90
  },
  screenHeader: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 24,
    gap: 8
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff"
  },
  screenSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 48
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)"
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center"
  },
  favoritesList: {
    padding: 16,
    gap: 16
  },
  favoriteCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    gap: 12
  },
  favoriteContent: {
    gap: 8
  },
  favoriteText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    fontWeight: "400"
  },
  favoriteReference: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500"
  },
  favoriteActions: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)"
  },
  favoriteActionButton: {
    padding: 8
  },
  aboutContent: {
    padding: 24,
    gap: 24,
    paddingBottom: 100
  },
  aboutSection: {
    gap: 12
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.8)"
  },
  aboutTextSmall: {
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255, 255, 255, 0.6)",
    fontStyle: "italic",
    marginTop: 4
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 12
  },
  settingInfo: {
    flex: 1,
    gap: 4
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  },
  settingDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)"
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 16,
    borderRadius: 12,
    marginTop: 8
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700"
  },
  streakCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    gap: 8
  },
  streakCardNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: "#FFD700"
  },
  streakCardLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  },
  streakCardDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: 4
  },
  timePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 12,
    borderRadius: 8,
    marginTop: 12
  },
  timePickerButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)"
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },
  colorOptionSelected: {
    borderColor: "#fff",
    borderWidth: 4
  },
  versionBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 8,
    textAlign: "center",
    letterSpacing: 1
  },
  versionGrid: {
    gap: 12,
    marginTop: 12
  },
  versionOption: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  versionOptionSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "#fff"
  },
  versionOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)"
  },
  versionOptionTextSelected: {
    color: "#fff",
    fontWeight: "600"
  },
  tappableWord: {
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: "rgba(255, 255, 255, 0.5)"
  },
  referenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end"
  },
  wordModalContainer: {
    maxHeight: "75%"
  },
  wordModalContent: {
    backgroundColor: "#2c3e50",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32
  },
  wordModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  wordModalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8
  },
  wordModalOriginal: {
    fontSize: 32,
    fontWeight: "300",
    color: "#FFD700",
    marginBottom: 4
  },
  wordModalTranslit: {
    fontSize: 16,
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.7)"
  },
  wordModalDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 16
  },
  wordModalStrongsLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#81b0ff",
    marginBottom: 16,
    letterSpacing: 0.5
  },
  wordModalScroll: {
    maxHeight: 200
  },
  wordModalDefinition: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16
  },
  wordModalEtymologyLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 8,
    letterSpacing: 0.5
  },
  wordModalEtymology: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255, 255, 255, 0.7)",
    fontStyle: "italic"
  },
  wordModalCloseButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16
  },
  wordModalCloseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  },
  musicTrackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent"
  },
  musicTrackButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "#4a7c7e"
  },
  musicTrackName: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500"
  },
  musicTrackNameActive: {
    color: "#fff",
    fontWeight: "600"
  },
  nowPlayingText: {
    fontSize: 12,
    color: "#4a7c7e",
    marginTop: 2,
    fontStyle: "italic"
  }
})
