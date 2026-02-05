import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput } from "react-native"
import { Feather } from "@expo/vector-icons"
import { getBibleBooks, getBook, getChapter, getOldTestamentBooks, getNewTestamentBooks, type BibleBook } from "./bibleData"

type ViewMode = "books" | "chapters" | "verses"

interface BibleReaderProps {
  onSaveVerse?: (verse: string, reference: string) => void
}

export default function BibleReader({ onSaveVerse }: BibleReaderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("books")
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null)
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [testament, setTestament] = useState<"all" | "old" | "new">("all")

  const books = getBibleBooks()
  const oldTestament = getOldTestamentBooks()
  const newTestament = getNewTestamentBooks()

  const getFilteredBooks = () => {
    let filtered = testament === "old" ? oldTestament : testament === "new" ? newTestament : books
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  const handleBookSelect = (bookIndex: number) => {
    setSelectedBookIndex(bookIndex)
    setSelectedChapterIndex(null)
    setViewMode("chapters")
  }

  const handleChapterSelect = (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex)
    setViewMode("verses")
  }

  const handleBack = () => {
    if (viewMode === "verses") {
      setViewMode("chapters")
      setSelectedChapterIndex(null)
    } else if (viewMode === "chapters") {
      setViewMode("books")
      setSelectedBookIndex(null)
    }
  }

  const renderBooks = () => {
    const filteredBooks = getFilteredBooks()

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bible</Text>
          <Text style={styles.subtitle}>Choose a book to read</Text>
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
            <Text style={[styles.filterText, testament === "old" && styles.filterTextActive]}>Old Testament</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, testament === "new" && styles.filterButtonActive]}
            onPress={() => setTestament("new")}
          >
            <Text style={[styles.filterText, testament === "new" && styles.filterTextActive]}>New Testament</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredBooks}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => {
            const actualIndex = books.findIndex(b => b.name === item.name)
            return (
              <TouchableOpacity
                style={styles.bookItem}
                onPress={() => handleBookSelect(actualIndex)}
              >
                <View>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text style={styles.bookInfo}>{item.chapters.length} chapters</Text>
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
    if (selectedBookIndex === null) return null
    
    const book = getBook(selectedBookIndex)
    if (!book) return null

    const chapters = Array.from({ length: book.chapters.length }, (_, i) => i + 1)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#4a7c7e" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{book.name}</Text>
            <Text style={styles.subtitle}>Select a chapter</Text>
          </View>
        </View>

        <View style={styles.chapterGrid}>
          {chapters.map((chapterNum, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chapterButton}
              onPress={() => handleChapterSelect(index)}
            >
              <Text style={styles.chapterNumber}>{chapterNum}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const renderVerses = () => {
    if (selectedBookIndex === null || selectedChapterIndex === null) return null
    
    const book = getBook(selectedBookIndex)
    const chapter = getChapter(selectedBookIndex, selectedChapterIndex)
    if (!book || !chapter) return null

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#4a7c7e" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{book.name} {selectedChapterIndex + 1}</Text>
            <Text style={styles.subtitle}>{chapter.length} verses</Text>
          </View>
        </View>

        <ScrollView style={styles.versesContainer} contentContainerStyle={styles.versesContent}>
          {chapter.map((verse, index) => (
            <View key={index} style={styles.verseRow}>
              <Text style={styles.verseNumber}>{index + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.verseText}>{verse}</Text>
                {onSaveVerse && (
                  <TouchableOpacity
                    style={styles.saveVerseButton}
                    onPress={() => {
                      const reference = `${book.name} ${selectedChapterIndex + 1}:${index + 1}`
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
      {viewMode === "books" && renderBooks()}
      {viewMode === "chapters" && renderChapters()}
      {viewMode === "verses" && renderVerses()}
    </View>
  )
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
  }
})
