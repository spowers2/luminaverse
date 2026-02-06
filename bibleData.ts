// Bible data types and utilities
import { Paths, File } from "expo-file-system"

export interface BibleBook {
  name: string
  abbrev: string
  chapters: string[][] // Array of chapters, each chapter is an array of verses
}

export type BibleVersion = "kjv" | "web" | "asv" | "bbe"

export interface BibleVersionInfo {
  id: BibleVersion
  name: string
  fullName: string
  downloadUrl: string
  size: string
}

export const BIBLE_VERSIONS: BibleVersionInfo[] = [
  {
    id: "kjv",
    name: "KJV",
    fullName: "King James Version",
    downloadUrl: "bible-api.com",
    size: "~5 MB"
  },
  {
    id: "web",
    name: "WEB",
    fullName: "World English Bible",
    downloadUrl: "bible-api.com",
    size: "~5 MB"
  },
  {
    id: "asv",
    name: "ASV",
    fullName: "American Standard Version",
    downloadUrl: "bible-api.com",
    size: "~5 MB"
  },
  {
    id: "bbe",
    name: "BBE",
    fullName: "Bible in Basic English",
    downloadUrl: "bible-api.com",
    size: "~5 MB"
  }
]

// Cache for loaded Bible data
const bibleDataCache: { [key: string]: BibleBook[] } = {}

const getBibleFile = (version: BibleVersion): File => {
  return new File(Paths.document, `bible-${version}.json`)
}

export const isVersionDownloaded = async (version: BibleVersion): Promise<boolean> => {
  try {
    const file = getBibleFile(version)
    return file.exists
  } catch (error) {
    return false
  }
}

// Helper to get chapter counts for each book
const getChapterCounts = (): { [key: string]: number } => ({
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
})

export const downloadBibleVersion = async (version: BibleVersion, onProgress?: (progress: number) => void): Promise<boolean> => {
  try {
    console.log(`Building ${version} Bible from bible-api.com...`)
    const file = getBibleFile(version)
    const chapterCounts = getChapterCounts()
    const bibleBooks: BibleBook[] = []

    let totalChapters = 0
    let downloadedChapters = 0

    // Calculate total chapters
    Object.values(chapterCounts).forEach(count => (totalChapters += count))
    console.log(`Total chapters to download: ${totalChapters}`)

    // Download each book
    for (const bookName of BOOK_NAMES) {
      const apiBookName = getAPIBookName(bookName)
      const chapterCount = chapterCounts[bookName] || 1
      const chapters: string[][] = []

      console.log(`Downloading ${bookName} (${chapterCount} chapters)...`)

      // Download each chapter
      for (let chapterNum = 1; chapterNum <= chapterCount; chapterNum++) {
        try {
          const response = await fetch(`https://bible-api.com/${encodeURIComponent(apiBookName)}+${chapterNum}?translation=${version}`)

          if (response.ok) {
            const data = await response.json()
            const verses: string[] = data.verses ? data.verses.map((v: any) => v.text) : []
            chapters.push(verses)
          } else {
            // If chapter fails, add empty array to maintain structure
            chapters.push([])
          }

          downloadedChapters++
          if (onProgress) {
            onProgress(downloadedChapters / totalChapters)
          }

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 50))
        } catch (error) {
          console.error(`Error downloading ${bookName} ${chapterNum}:`, error)
          chapters.push([])
        }
      }

      bibleBooks.push({
        name: bookName,
        abbrev: bookName.toLowerCase().replace(/\s+/g, ""),
        chapters
      })
    }

    // Save to file
    const jsonData = JSON.stringify(bibleBooks)
    console.log(`Writing ${jsonData.length} characters to file`)
    await file.write(jsonData)
    console.log(`Successfully downloaded and saved ${version}`)

    return true
  } catch (error) {
    console.error(`Error downloading ${version}:`, error)
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`)
    }
    return false
  }
}

export const deleteDownloadedVersion = async (version: BibleVersion): Promise<boolean> => {
  try {
    const file = getBibleFile(version)
    if (file.exists) {
      await file.delete()
    }
    delete bibleDataCache[version]
    return true
  } catch (error) {
    console.error(`Error deleting ${version}:`, error)
    return false
  }
}

export const loadBibleData = async (version: BibleVersion = "kjv"): Promise<BibleBook[]> => {
  // Return cached data if available
  if (bibleDataCache[version]) {
    return bibleDataCache[version]
  }

  try {
    // Check if downloaded locally
    const file = getBibleFile(version)

    if (file.exists) {
      const fileContent = await file.text()
      const data = JSON.parse(fileContent) as BibleBook[]
      bibleDataCache[version] = data
      return data
    }

    // If not downloaded, return empty array (will use API for online reading)
    return []
  } catch (error) {
    console.error("Error loading Bible data:", error)
    return []
  }
}

// Fetch chapter from API when not downloaded
export const fetchChapterFromAPI = async (bookName: string, chapterNum: number, version: BibleVersion = "kjv"): Promise<string[] | null> => {
  try {
    const apiBookName = getAPIBookName(bookName)
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(apiBookName)}+${chapterNum}?translation=${version}`)

    if (!response.ok) return null

    const data = await response.json()

    // bible-api.com returns verses in format with verse numbers
    // Parse them into array
    if (data.verses && Array.isArray(data.verses)) {
      return data.verses.map((v: any) => v.text)
    }

    return null
  } catch (error) {
    console.error("Error fetching chapter from API:", error)
    return null
  }
}

// Static book list for when offline and not downloaded (66 standard Bible books)
export const BOOK_NAMES = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"]

// Map display names to API-compatible names for bible-api.com
export const getAPIBookName = (bookName: string): string => {
  const apiNames: { [key: string]: string } = {
    "Song of Solomon": "Song of Songs"
  }
  return apiNames[bookName] || bookName
}
