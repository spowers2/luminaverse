import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, ActivityIndicator, Alert, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  BIBLE_VERSIONS,
  isVersionDownloaded,
  downloadBibleVersion,
  deleteDownloadedVersion,
  loadBibleData,
  fetchChapterFromAPI,
  BOOK_NAMES,
  type BibleVersion,
  type BibleBook
} from "./bibleData"

type ViewMode = "version-picker" | "books" | "chapters" | "verses"

interface BibleReaderProps {
  onSaveVerse?: (verse: string, reference: string) => void
  fontStyle?: "sans-serif" | "serif"
}

export default function BibleReader({ onSaveVerse, fontStyle = "sans-serif" }: BibleReaderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("version-picker")
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion>("kjv")
  const [downloadedVersions, setDownloadedVersions] = useState<BibleVersion[]>([])
  const [downloadingVersion, setDownloadingVersion] = useState<BibleVersion | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null)
  const [selectedBookName, setSelectedBookName] = useState<string>("")
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null)
  const [selectedChapterCount, setSelectedChapterCount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [testament, setTestament] = useState<"all" | "old" | "new">("all")
  const [books, setBooks] = useState<BibleBook[]>([])
  const [chapterVerses, setChapterVerses] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkDownloadedVersions()
    loadSavedVersion()
  }, [])

  const loadSavedVersion = async () => {
    try {
      const saved = await AsyncStorage.getItem("@bibleReaderVersion")
      if (saved && BIBLE_VERSIONS.find(v => v.id === saved)) {
        setSelectedVersion(saved as BibleVersion)
      }
    } catch (error) {
      console.error("Error loading saved version:", error)
    }
  }

  const saveSelectedVersion = async (version: BibleVersion) => {
    try {
      await AsyncStorage.setItem("@bibleReaderVersion", version)
      setSelectedVersion(version)
    } catch (error) {
      console.error("Error saving version:", error)
    }
  }

  const checkDownloadedVersions = async () => {
    const downloaded: BibleVersion[] = []
    for (const version of BIBLE_VERSIONS) {
      if (await isVersionDownloaded(version.id)) {
        downloaded.push(version.id)
      }
    }
    setDownloadedVersions(downloaded)
  }

  const handleDownload = async (version: BibleVersion) => {
    setDownloadingVersion(version)
    setDownloadProgress(0)

    const success = await downloadBibleVersion(version, (progress) => {
      setDownloadProgress(progress)
    })

    if (success) {
      await checkDownloadedVersions()
      Alert.alert("Downloaded!", `${BIBLE_VERSIONS.find(v => v.id === version)?.fullName} is now available offline.`)
    } else {
      Alert.alert("Download Failed", "Please check your internet connection and try again.")
    }

    setDownloadingVersion(null)
  }

  const handleDelete = async (version: BibleVersion) => {
    Alert.alert(
      "Delete Bible Version",
      `Remove ${BIBLE_VERSIONS.find(v => v.id === version)?.fullName} from your device?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteDownloadedVersion(version)
            if (success) {
              await checkDownloadedVersions()
              Alert.alert("Deleted", "Bible version removed from your device.")
            }
          }
        }
      ]
    )
  }

  const handleVersionSelect = async (version: BibleVersion) => {
    await saveSelectedVersion(version)
    const isDownloaded = downloadedVersions.includes(version)
    
    if (isDownloaded) {
      // Load offline data
      setLoading(true)
      const data = await loadBibleData(version)
      setBooks(data)
      setLoading(false)
      setViewMode("books")
    } else {
      // Use online mode
      setBooks([])
      setViewMode("books")
    }
  }

  const handleBookSelect = async (bookIndex: number, bookName: string, chapterCount: number) => {
    setSelectedBookIndex(bookIndex)
    setSelectedBookName(bookName)
    setSelectedChapterCount(chapterCount)
    setSelectedChapterIndex(null)
    setViewMode("chapters")
  }

  const handleChapterSelect = async (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex)
    setLoading(true)
    setViewMode("verses")

    const isDownloaded = downloadedVersions.includes(selectedVersion)

    if (isDownloaded && selectedBookIndex !== null) {
      // Load from downloaded data
      const data = await loadBibleData(selectedVersion)
      if (data[selectedBookIndex]) {
        setChapterVerses(data[selectedBookIndex].chapters[chapterIndex] || null)
      }
    } else {
      // Fetch from API
      const verses = await fetchChapterFromAPI(selectedBookName, chapterIndex + 1, selectedVersion)
      setChapterVerses(verses)
    }

    setLoading(false)
  }

  const handleBack = () => {
    if (viewMode === "verses") {
      setViewMode("chapters")
      setChapterVerses(null)
    } else if (viewMode === "chapters") {
      setViewMode("books")
      setSelectedBookIndex(null)
    } else if (viewMode === "books") {
      setViewMode("version-picker")
    }
  }

  const renderVersionPicker = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bible Reader</Text>
          <Text style={styles.subtitle}>Choose a version</Text>
        </View>

        <ScrollView contentContainerStyle={styles.versionList}>
          {BIBLE_VERSIONS.map((version) => {
            const isDownloaded = downloadedVersions.includes(version.id)
            const isDownloading = downloadingVersion === version.id

            return (
              <View key={version.id} style={styles.versionCard}>
                <TouchableOpacity 
                  style={styles.versionInfo}
                  onPress={() => handleVersionSelect(version.id)}
                >
                  <View>
                    <Text style={styles.versionName}>{version.fullName}</Text>
                    <Text style={styles.versionDetail}>{version.name} • {version.size}</Text>
                    {isDownloaded && <Text style={styles.offlineBadge}>✓ Available Offline</Text>}
                    {!isDownloaded && <Text style={styles.onlineBadge}>📡 Online Only</Text>}
                  </View>
                  <Feather name="chevron-right" size={24} color="#4a7c7e" />
                </TouchableOpacity>

                <View style={styles.versionActions}>
                  {isDownloading ? (
                    <View style={styles.downloadProgress}>
                      <ActivityIndicator color="#4a7c7e" />
                      <Text style={styles.downloadText}>{Math.round(downloadProgress * 100)}%</Text>
                    </View>
                  ) : isDownloaded ? (
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDelete(version.id)}
                    >
                      <Feather name="trash-2" size={18} color="#ff6b6b" />
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={styles.downloadButton}
                      onPress={() => handleDownload(version.id)}
                    >
                      <Feather name="download" size={18} color="#4a7c7e" />
                      <Text style={styles.downloadButtonText}>Download</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )
          })}

          <View style={styles.infoBox}>
            <Feather name="info" size={16} color="#888" />
            <Text style={styles.infoText}>
              Download for offline reading or read online with internet connection. All versions are free.
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  const renderBooks = () => {
    const isDownloaded = downloadedVersions.includes(selectedVersion)
    const versionInfo = BIBLE_VERSIONS.find(v => v.id === selectedVersion)

    // If downloaded, use actual book data; otherwise use static list
    const bookList = isDownloaded && books.length > 0 ? books : 
      BOOK_NAMES.map((name, index) => ({
        name,
        abbrev: name.toLowerCase().replace(/\s+/g, ''),
        chapters: [] // Empty array so getDefaultChapterCount is used
      }))

    let filteredBooks = bookList
    if (testament === "old") {
      filteredBooks = bookList.slice(0, 39)
    } else if (testament === "new") {
      filteredBooks = bookList.slice(39)
    }

    if (searchQuery.trim()) {
      filteredBooks = filteredBooks.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#4a7c7e" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{versionInfo?.name || "Bible"}</Text>
            <Text style={styles.subtitle}>Choose a book</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.testamentFilter}>
          <TouchableOpacity
            style={[styles.filterButton, testament === "all" && styles.filterButtonActive]}
            onPress={() => setTestament("all")}
          >
            <Text style={[styles.filterText, testament === "all" && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, testament === "old" && styles.filterButtonActive]}
            onPress={() => setTestament("old")}
          >
            <Text style={[styles.filterText, testament === "old" && styles.filterTextActive]}>Old</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, testament === "new" && styles.filterButtonActive]}
            onPress={() => setTestament("new")}
          >
            <Text style={[styles.filterText, testament === "new" && styles.filterTextActive]}>New</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredBooks}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }) => {
            const actualIndex = BOOK_NAMES.indexOf(item.name)
            const chapterCount = item.chapters?.length || getDefaultChapterCount(item.name)
            
            return (
              <TouchableOpacity
                style={styles.bookItem}
                onPress={() => handleBookSelect(actualIndex, item.name, chapterCount)}
              >
                <View>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text style={styles.bookInfo}>{chapterCount} chapters</Text>
                </View>
                <Feather name="chevron-right" size={24} color="#4a7c7e" />
              </TouchableOpacity>
            )
          }}
          contentContainerStyle={styles.list}
        />
      </View>
    )
  }

  const renderChapters = () => {
    const chapters = Array.from({ length: selectedChapterCount }, (_, i) => i + 1)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#4a7c7e" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{selectedBookName}</Text>
            <Text style={styles.subtitle}>Select a chapter</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.chapterGrid}>
          {chapters.map((chapterNum, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterButton}
              onPress={() => handleChapterSelect(index)}
            >
              <Text style={styles.chapterNumber}>{chapterNum}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  const renderVerses = () => {
    const fontFamily = fontStyle === "serif" ? (Platform.OS === 'ios' ? 'Georgia' : 'serif') : undefined

    if (loading || !chapterVerses) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#4a7c7e" />
          <Text style={styles.loadingText}>Loading chapter...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#4a7c7e" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{selectedBookName} {(selectedChapterIndex ?? 0) + 1}</Text>
            <Text style={styles.subtitle}>{chapterVerses.length} verses</Text>
          </View>
        </View>

        <ScrollView style={styles.versesContainer} contentContainerStyle={styles.versesContent}>
          {chapterVerses.map((verse, index) => (
            <View key={index} style={styles.verseRow}>
              <Text style={styles.verseNumber}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.verseText, fontFamily && { fontFamily }]}>
                  {verse}
                </Text>
                {onSaveVerse && (
                  <TouchableOpacity
                    style={styles.saveVerseButton}
                    onPress={() => {
                      const reference = `${selectedBookName} ${(selectedChapterIndex ?? 0) + 1}:${index + 1}`
                      onSaveVerse(verse, reference)
                    }}
                  >
                    <Feather name="bookmark" size={16} color="#4a7c7e" />
                    <Text style={styles.saveVerseText}>Save</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {viewMode === "version-picker" && renderVersionPicker()}
      {viewMode === "books" && renderBooks()}
      {viewMode === "chapters" && renderChapters()}
      {viewMode === "verses" && renderVerses()}
    </View>
  )
}

// Helper function to get chapter counts for books when not downloaded
function getDefaultChapterCount(bookName: string): number {
  const counts: { [key: string]: number } = {
    'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
    'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1 Samuel': 31, '2 Samuel': 24,
    '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10,
    'Nehemiah': 13, 'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31,
    'Ecclesiastes': 12, 'Song of Solomon': 8, 'Isaiah': 66, 'Jeremiah': 52,
    'Lamentations': 5, 'Ezekiel': 48, 'Daniel': 12, 'Hosea': 14, 'Joel': 3,
    'Amos': 9, 'Obadiah': 1, 'Jonah': 4, 'Micah': 7, 'Nahum': 3,
    'Habakkuk': 3, 'Zephaniah': 3, 'Haggai': 2, 'Zechariah': 14, 'Malachi': 4,
    'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
    'Romans': 16, '1 Corinthians': 16, '2 Corinthians': 13, 'Galatians': 6, 'Ephesians': 6,
    'Philippians': 4, 'Colossians': 4, '1 Thessalonians': 5, '2 Thessalonians': 3,
    '1 Timothy': 6, '2 Timothy': 4, 'Titus': 3, 'Philemon': 1, 'Hebrews': 13,
    'James': 5, '1 Peter': 5, '2 Peter': 3, '1 John': 5, '2 John': 1,
    '3 John': 1, 'Jude': 1, 'Revelation': 22
  }
  return counts[bookName] || 1
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  backButton: {
    marginRight: 12
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333"
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4
  },
  versionList: {
    padding: 16
  },
  versionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden"
  },
  versionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  },
  versionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4
  },
  versionDetail: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6
  },
  offlineBadge: {
    fontSize: 12,
    color: "#4a7c7e",
    fontWeight: "600"
  },
  onlineBadge: {
    fontSize: 12,
    color: "#888"
  },
  versionActions: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    padding: 12,
    alignItems: "center"
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  downloadButtonText: {
    color: "#4a7c7e",
    fontWeight: "600",
    fontSize: 14
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  deleteText: {
    color: "#ff6b6b",
    fontWeight: "600",
    fontSize: 14
  },
  downloadProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  downloadText: {
    fontSize: 14,
    color: "#4a7c7e"
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 8
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
    lineHeight: 18
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333"
  },
  testamentFilter: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0"
  },
  filterButtonActive: {
    backgroundColor: "#4a7c7e",
    borderColor: "#4a7c7e"
  },
  filterText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600"
  },
  filterTextActive: {
    color: "#fff"
  },
  list: {
    padding: 16
  },
  bookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  bookName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4
  },
  bookInfo: {
    fontSize: 14,
    color: "#888"
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12
  },
  chapterButton: {
    width: "18%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  chapterNumber: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4a7c7e"
  },
  versesContainer: {
    flex: 1
  },
  versesContent: {
    padding: 20
  },
  verseRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a7c7e",
    minWidth: 32
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333"
  },
  saveVerseButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4
  },
  saveVerseText: {
    fontSize: 12,
    color: "#4a7c7e",
    fontWeight: "600"
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#888"
  }
})
