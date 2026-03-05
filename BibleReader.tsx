import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput, ActivityIndicator, Alert, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { BIBLE_VERSIONS, isVersionDownloaded, downloadBibleVersion, deleteDownloadedVersion, loadBibleData, fetchChapterFromAPI, BOOK_NAMES, type BibleVersion, type BibleBook } from "./bibleData"

type ViewMode = "version-picker" | "books" | "chapters" | "verses"

interface VerseSearchResult {
  bookIndex: number
  bookName: string
  chapterIndex: number
  verseIndex: number
  verseText: string
  reference: string
}

interface BibleReaderProps {
  onSaveVerse?: (verse: string, reference: string) => void
  fontStyle?: "sans-serif" | "serif"
  themeColor?: string
  initialReference?: string | null
  initialVersion?: string
  onInitialNavigationDone?: () => void
}

export default function BibleReader({ onSaveVerse, fontStyle = "sans-serif", themeColor = "#4a7c7e", initialReference, initialVersion, onInitialNavigationDone }: BibleReaderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialReference ? "verses" : "version-picker")
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
  const [loading, setLoading] = useState<boolean>(!!initialReference)
  const [loadError, setLoadError] = useState(false)
  const [verseSearchResults, setVerseSearchResults] = useState<VerseSearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null)
  const [fromSearch, setFromSearch] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const verseYPositions = useRef<{ [key: number]: number }>({})

  useEffect(() => {
    checkDownloadedVersions()
    loadSavedVersion()
  }, [])

  useEffect(() => {
    if (initialReference) {
      navigateToReference(initialReference, initialVersion)
    }
  }, [initialReference])

  const navigateToReference = async (reference: string, version?: string) => {
    try {
      // Parse reference e.g. "John 3:16", "1 Corinthians 13:4", "Song of Solomon 2:10"
      const colonIdx = reference.lastIndexOf(":")
      if (colonIdx === -1) {
        setLoading(false)
        return
      }
      const verseNum = parseInt(reference.substring(colonIdx + 1), 10)
      const bookChapter = reference.substring(0, colonIdx).trim()
      const lastSpaceIdx = bookChapter.lastIndexOf(" ")
      if (lastSpaceIdx === -1) {
        setLoading(false)
        return
      }
      const bookName = bookChapter.substring(0, lastSpaceIdx).trim()
      const chapterNum = parseInt(bookChapter.substring(lastSpaceIdx + 1), 10)
      if (isNaN(verseNum) || isNaN(chapterNum)) {
        setLoading(false)
        return
      }
      // Normalize book name variants returned by different Bible APIs
      let normalizedBookName = bookName
      if (normalizedBookName === "Psalm") normalizedBookName = "Psalms"
      if (normalizedBookName === "Song Of Solomon") normalizedBookName = "Song of Solomon"
      if (normalizedBookName === "Song of Songs") normalizedBookName = "Song of Solomon"
      if (normalizedBookName === "Song Of Songs") normalizedBookName = "Song of Solomon"
      if (normalizedBookName === "Revelation") normalizedBookName = "Revelation"
      const bookIndex = BOOK_NAMES.indexOf(normalizedBookName)
      if (bookIndex === -1) {
        setLoading(false)
        return
      }

      const targetVersion = (version as BibleVersion) || selectedVersion
      if (targetVersion !== selectedVersion) {
        await saveSelectedVersion(targetVersion)
      }

      const chapterCount = getDefaultChapterCount(normalizedBookName)
      setSelectedBookIndex(bookIndex)
      setSelectedBookName(normalizedBookName)
      setSelectedChapterCount(chapterCount)
      setSelectedChapterIndex(chapterNum - 1)
      setHighlightedVerse(verseNum - 1)
      setFromSearch(true)
      setViewMode("verses")
      setLoading(true)
      setLoadError(false)
      setChapterVerses(null)

      const downloaded = await isVersionDownloaded(targetVersion)
      let versesToSet: string[] | null = null

      if (downloaded) {
        const data = await loadBibleData(targetVersion)
        const cachedChapter = data[bookIndex]?.chapters[chapterNum - 1]
        if (cachedChapter && cachedChapter.length > 0) {
          versesToSet = cachedChapter
        }
      }

      // Fall back to API if not downloaded or cached chapter was empty (failed during download)
      if (!versesToSet) {
        versesToSet = await fetchChapterFromAPI(normalizedBookName, chapterNum, targetVersion)
      }

      if (!versesToSet || versesToSet.length === 0) {
        setLoadError(true)
      } else {
        setChapterVerses(versesToSet)
      }

      setLoading(false)
      onInitialNavigationDone?.()
    } catch (error) {
      console.error(`[navigateToReference] EXCEPTION:`, error)
      setLoadError(true)
      setLoading(false)
      onInitialNavigationDone?.()
    }
  }

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

    const success = await downloadBibleVersion(version, progress => {
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
    Alert.alert("Delete Bible Version", `Remove ${BIBLE_VERSIONS.find(v => v.id === version)?.fullName} from your device?`, [
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
    ])
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
    setSearchQuery("")
    setVerseSearchResults([])
    setViewMode("chapters")
  }

  const handleVerseResultTap = async (result: VerseSearchResult) => {
    setSelectedBookIndex(result.bookIndex)
    setSelectedBookName(result.bookName)
    setSelectedChapterIndex(result.chapterIndex)
    setHighlightedVerse(result.verseIndex)
    setFromSearch(true)
    setSearchQuery("")
    setVerseSearchResults([])

    // Load the chapter
    setLoading(true)
    setLoadError(false)
    setViewMode("verses")
    setChapterVerses(null)

    const isDownloaded = downloadedVersions.includes(selectedVersion)
    let versesToSet: string[] | null = null

    if (isDownloaded && books.length > 0) {
      const cachedChapter = books[result.bookIndex]?.chapters[result.chapterIndex]
      if (cachedChapter && cachedChapter.length > 0) {
        versesToSet = cachedChapter
      }
    }

    // Fall back to API if not downloaded or cached chapter was empty
    if (!versesToSet) {
      versesToSet = await fetchChapterFromAPI(result.bookName, result.chapterIndex + 1, selectedVersion)
    }

    if (!versesToSet || versesToSet.length === 0) {
      setLoadError(true)
    } else {
      setChapterVerses(versesToSet)
    }

    setLoading(false)
  }

  const handleChapterSelect = async (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex)
    setHighlightedVerse(null)
    setFromSearch(false)
    setLoading(true)
    setLoadError(false)
    setViewMode("verses")
    setChapterVerses(null)

    try {
      const isDownloaded = downloadedVersions.includes(selectedVersion)
      let versesToSet: string[] | null = null

      if (isDownloaded && selectedBookIndex !== null) {
        const data = await loadBibleData(selectedVersion)
        const cachedChapter = data[selectedBookIndex]?.chapters[chapterIndex]
        if (cachedChapter && cachedChapter.length > 0) {
          versesToSet = cachedChapter
        }
      }

      // Fall back to API if not downloaded or cached chapter was empty (failed during download)
      if (!versesToSet) {
        versesToSet = await fetchChapterFromAPI(selectedBookName, chapterIndex + 1, selectedVersion)
      }

      if (!versesToSet || versesToSet.length === 0) {
        setLoadError(true)
      } else {
        setChapterVerses(versesToSet)
      }
    } catch (error) {
      console.error(`[handleChapterSelect] EXCEPTION:`, error)
      setLoadError(true)
    }

    setLoading(false)
  }

  const searchVerses = async (query: string) => {
    if (!query.trim() || books.length === 0) {
      setVerseSearchResults([])
      return
    }

    setSearching(true)
    const results: VerseSearchResult[] = []
    const searchLower = query.toLowerCase()

    try {
      books.forEach((book, bookIndex) => {
        book.chapters.forEach((chapter, chapterIndex) => {
          chapter.forEach((verse, verseIndex) => {
            if (verse.toLowerCase().includes(searchLower)) {
              results.push({
                bookIndex,
                bookName: book.name,
                chapterIndex,
                verseIndex,
                verseText: verse,
                reference: `${book.name} ${chapterIndex + 1}:${verseIndex + 1}`
              })
            }
          })
        })
      })

      setVerseSearchResults(results.slice(0, 50)) // Limit to 50 results
    } catch (error) {
      console.error("Error searching verses:", error)
    } finally {
      setSearching(false)
    }
  }

  const handleBack = () => {
    if (viewMode === "verses") {
      if (fromSearch) {
        // Return directly to search results
        setViewMode("books")
        setFromSearch(false)
        setHighlightedVerse(null)
      } else {
        setViewMode("chapters")
      }
      setChapterVerses(null)
    } else if (viewMode === "chapters") {
      setViewMode("books")
      setSelectedBookIndex(null)
    } else if (viewMode === "books") {
      setViewMode("version-picker")
      setSearchQuery("")
      setVerseSearchResults([])
    }
  }

  const renderVersionPicker = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Bible Reader</Text>
            <Text style={styles.subtitle}>Choose a version</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.versionList}>
          {BIBLE_VERSIONS.map(version => {
            const isDownloaded = downloadedVersions.includes(version.id)
            const isDownloading = downloadingVersion === version.id

            return (
              <View key={version.id} style={styles.versionCard}>
                <TouchableOpacity style={styles.versionInfo} onPress={() => handleVersionSelect(version.id)}>
                  <View>
                    <Text style={styles.versionName}>{version.fullName}</Text>
                    <Text style={styles.versionDetail}>
                      {version.name} • {version.size}
                    </Text>
                    {isDownloaded && <Text style={[styles.offlineBadge, { color: themeColor }]}>✓ Available Offline</Text>}
                    {!isDownloaded && <Text style={styles.onlineBadge}>📡 Online Only</Text>}
                  </View>
                  <Feather name="chevron-right" size={24} color={themeColor} />
                </TouchableOpacity>

                <View style={styles.versionActions}>
                  {isDownloading ? (
                    <View style={styles.downloadProgress}>
                      <ActivityIndicator color={themeColor} />
                      <Text style={[styles.downloadText, { color: themeColor }]}>{Math.round(downloadProgress * 100)}%</Text>
                    </View>
                  ) : isDownloaded ? (
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(version.id)}>
                      <Feather name="trash-2" size={18} color="#ff6b6b" />
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(version.id)}>
                      <Feather name="download" size={18} color={themeColor} />
                      <Text style={[styles.downloadButtonText, { color: themeColor }]}>Download</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )
          })}

          <View style={styles.infoBox}>
            <Feather name="info" size={16} color="#888" />
            <Text style={styles.infoText}>Download for offline reading or read online with internet connection. All versions are free.</Text>
          </View>
        </ScrollView>
      </View>
    )
  }

  const renderBooks = () => {
    const isDownloaded = downloadedVersions.includes(selectedVersion)
    const versionInfo = BIBLE_VERSIONS.find(v => v.id === selectedVersion)

    // If downloaded, use actual book data; otherwise use static list
    const bookList =
      isDownloaded && books.length > 0
        ? books
        : BOOK_NAMES.map((name, index) => ({
            name,
            abbrev: name.toLowerCase().replace(/\s+/g, ""),
            chapters: [] // Empty array so getDefaultChapterCount is used
          }))

    let filteredBooks = bookList
    if (testament === "old") {
      filteredBooks = bookList.slice(0, 39)
    } else if (testament === "new") {
      filteredBooks = bookList.slice(39)
    }

    // Filter books by name
    let bookNameMatches = filteredBooks
    if (searchQuery.trim()) {
      bookNameMatches = filteredBooks.filter(book => book.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Show verse search results if available and have search query
    const showVerseResults = isDownloaded && searchQuery.trim() && verseSearchResults.length > 0

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={themeColor} />
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
            placeholder={isDownloaded ? "Search books or verses..." : "Search books..."}
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text)
              if (isDownloaded && text.trim().length >= 3) {
                searchVerses(text)
              } else {
                setVerseSearchResults([])
              }
            }}
            onSubmitEditing={() => {
              if (isDownloaded && searchQuery.trim().length >= 3) {
                searchVerses(searchQuery)
              }
            }}
            returnKeyType="search"
            placeholderTextColor="#888"
          />
          {searching && <ActivityIndicator size="small" color={themeColor} style={{ marginLeft: 8 }} />}
        </View>

        <View style={styles.testamentFilter}>
          <TouchableOpacity style={[styles.filterButton, testament === "all" && styles.filterButtonActive, testament === "all" && { backgroundColor: themeColor, borderColor: themeColor }]} onPress={() => setTestament("all")}>
            <Text style={[styles.filterText, testament === "all" && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, testament === "old" && styles.filterButtonActive, testament === "old" && { backgroundColor: themeColor, borderColor: themeColor }]} onPress={() => setTestament("old")}>
            <Text style={[styles.filterText, testament === "old" && styles.filterTextActive]}>Old</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, testament === "new" && styles.filterButtonActive, testament === "new" && { backgroundColor: themeColor, borderColor: themeColor }]} onPress={() => setTestament("new")}>
            <Text style={[styles.filterText, testament === "new" && styles.filterTextActive]}>New</Text>
          </TouchableOpacity>
        </View>

        {showVerseResults ? (
          <FlatList
            data={verseSearchResults}
            keyExtractor={(item, index) => `${item.reference}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.verseResultItem} onPress={() => handleVerseResultTap(item)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.verseResultReference}>{item.reference}</Text>
                  <Text style={styles.verseResultText} numberOfLines={2}>
                    {item.verseText}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color={themeColor} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <View style={styles.searchResultsHeader}>
                <Text style={styles.searchResultsHeaderText}>
                  {verseSearchResults.length} verse{verseSearchResults.length !== 1 ? "s" : ""} found
                  {verseSearchResults.length === 50 ? " (showing first 50)" : ""}
                </Text>
              </View>
            }
            ListEmptyComponent={
              searching ? (
                <View style={styles.emptySearch}>
                  <ActivityIndicator size="large" color={themeColor} />
                  <Text style={styles.emptySearchText}>Searching...</Text>
                </View>
              ) : null
            }
          />
        ) : (
          <FlatList
            data={bookNameMatches}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item, index }) => {
              const actualIndex = BOOK_NAMES.indexOf(item.name)
              const chapterCount = item.chapters?.length || getDefaultChapterCount(item.name)

              return (
                <TouchableOpacity style={styles.bookItem} onPress={() => handleBookSelect(actualIndex, item.name, chapterCount)}>
                  <View>
                    <Text style={styles.bookName}>{item.name}</Text>
                    <Text style={styles.bookInfo}>{chapterCount} chapters</Text>
                  </View>
                  <Feather name="chevron-right" size={24} color={themeColor} />
                </TouchableOpacity>
              )
            }}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              searchQuery.trim() && !isDownloaded ? (
                <View style={styles.emptySearch}>
                  <Feather name="info" size={32} color="#ccc" />
                  <Text style={styles.emptySearchText}>Download this Bible version to search verses</Text>
                </View>
              ) : searchQuery.trim() ? (
                <View style={styles.emptySearch}>
                  <Feather name="search" size={32} color="#ccc" />
                  <Text style={styles.emptySearchText}>No books found</Text>
                  {isDownloaded && <Text style={styles.emptySearchSubtext}>Type at least 3 characters to search verses</Text>}
                </View>
              ) : null
            }
          />
        )}
      </View>
    )
  }

  const renderChapters = () => {
    const chapters = Array.from({ length: selectedChapterCount }, (_, i) => i + 1)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={themeColor} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{selectedBookName}</Text>
            <Text style={styles.subtitle}>Select a chapter</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.chapterGrid}>
          {chapters.map((chapterNum, index) => (
            <TouchableOpacity key={index} style={styles.chapterButton} onPress={() => handleChapterSelect(index)}>
              <Text style={[styles.chapterNumber, { color: themeColor }]}>{chapterNum}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  const renderVerses = () => {
    const fontFamily = fontStyle === "serif" ? (Platform.OS === "ios" ? "Georgia" : "serif") : undefined
    if (loading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={themeColor} />
          <Text style={styles.loadingText}>Loading chapter...</Text>
        </View>
      )
    }

    if (loadError || !chapterVerses) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color={themeColor} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {selectedBookName} {(selectedChapterIndex ?? 0) + 1}
              </Text>
            </View>
          </View>
          <View style={[styles.container, styles.loadingContainer]}>
            <Feather name="wifi-off" size={48} color="#ccc" />
            <Text style={[styles.loadingText, { marginTop: 16, textAlign: "center", paddingHorizontal: 32 }]}>Failed to load chapter. Check your internet connection or download this version for offline reading.</Text>
            <TouchableOpacity onPress={() => handleChapterSelect(selectedChapterIndex ?? 0)} style={{ marginTop: 16, backgroundColor: themeColor, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}>
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={themeColor} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {selectedBookName} {(selectedChapterIndex ?? 0) + 1}
            </Text>
            <Text style={styles.subtitle}>{chapterVerses.length} verses</Text>
          </View>
        </View>

        <ScrollView ref={scrollViewRef} style={styles.versesContainer} contentContainerStyle={styles.versesContent}>
          {chapterVerses.map((verse, index) => (
            <View
              key={index}
              style={[styles.verseRow, highlightedVerse === index && { backgroundColor: `${themeColor}15`, borderLeftWidth: 4, borderLeftColor: themeColor, paddingLeft: 8, marginLeft: -12, borderRadius: 8 }]}
              onLayout={event => {
                const { y } = event.nativeEvent.layout
                verseYPositions.current[index] = y

                // Scroll to highlighted verse when its position is known
                if (highlightedVerse === index && scrollViewRef.current) {
                  setTimeout(() => {
                    const yPosition = verseYPositions.current[index]
                    if (yPosition !== undefined) {
                      // Center the verse (approximate screen height of 600)
                      const offsetY = Math.max(0, yPosition - 250)
                      scrollViewRef.current?.scrollTo({ y: offsetY, animated: true })
                    }
                  }, 150)
                }
              }}
            >
              <Text style={[styles.verseNumber, { color: themeColor }]}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.verseText, fontFamily && { fontFamily }]}>{verse}</Text>
                {onSaveVerse && (
                  <TouchableOpacity
                    style={styles.saveVerseButton}
                    onPress={() => {
                      const reference = `${selectedBookName} ${(selectedChapterIndex ?? 0) + 1}:${index + 1}`
                      onSaveVerse(verse, reference)
                    }}
                  >
                    <Feather name="bookmark" size={16} color={themeColor} />
                    <Text style={[styles.saveVerseText, { color: themeColor }]}>Save</Text>
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
    Genesis: 50,
    Exodus: 40,
    Leviticus: 27,
    Numbers: 36,
    Deuteronomy: 34,
    Joshua: 24,
    Judges: 21,
    Ruth: 4,
    "1 Samuel": 31,
    "2 Samuel": 24,
    "1 Kings": 22,
    "2 Kings": 25,
    "1 Chronicles": 29,
    "2 Chronicles": 36,
    Ezra: 10,
    Nehemiah: 13,
    Esther: 10,
    Job: 42,
    Psalms: 150,
    Proverbs: 31,
    Ecclesiastes: 12,
    "Song of Solomon": 8,
    Isaiah: 66,
    Jeremiah: 52,
    Lamentations: 5,
    Ezekiel: 48,
    Daniel: 12,
    Hosea: 14,
    Joel: 3,
    Amos: 9,
    Obadiah: 1,
    Jonah: 4,
    Micah: 7,
    Nahum: 3,
    Habakkuk: 3,
    Zephaniah: 3,
    Haggai: 2,
    Zechariah: 14,
    Malachi: 4,
    Matthew: 28,
    Mark: 16,
    Luke: 24,
    John: 21,
    Acts: 28,
    Romans: 16,
    "1 Corinthians": 16,
    "2 Corinthians": 13,
    Galatians: 6,
    Ephesians: 6,
    Philippians: 4,
    Colossians: 4,
    "1 Thessalonians": 5,
    "2 Thessalonians": 3,
    "1 Timothy": 6,
    "2 Timothy": 4,
    Titus: 3,
    Philemon: 1,
    Hebrews: 13,
    James: 5,
    "1 Peter": 5,
    "2 Peter": 3,
    "1 John": 5,
    "2 John": 1,
    "3 John": 1,
    Jude: 1,
    Revelation: 22
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
    marginTop: 6
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
    fontSize: 14
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
    borderWidth: 2
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
    fontWeight: "600"
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
  },
  verseResultItem: {
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
  verseResultReference: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6
  },
  verseResultText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666"
  },
  searchResultsHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16
  },
  searchResultsHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center"
  },
  emptySearch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32
  },
  emptySearchText: {
    fontSize: 16,
    color: "#888",
    marginTop: 16,
    textAlign: "center"
  },
  emptySearchSubtext: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 8,
    textAlign: "center"
  }
})
