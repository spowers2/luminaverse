// Bible data types and utilities
import { Paths, File } from 'expo-file-system'

export interface BibleBook {
  name: string
  abbrev: string
  chapters: string[][] // Array of chapters, each chapter is an array of verses
}

export interface BibleData {
  books: BibleBook[]
}

export type BibleVersion = 'kjv' | 'web' | 'asv' | 'bbe'

export interface BibleVersionInfo {
  id: BibleVersion
  name: string
  fullName: string
  downloadUrl: string
  size: string
}

export const BIBLE_VERSIONS: BibleVersionInfo[] = [
  {
    id: 'kjv',
    name: 'KJV',
    fullName: 'King James Version',
    downloadUrl: 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json',
    size: '4.4 MB'
  },
  {
    id: 'web',
    name: 'WEB',
    fullName: 'World English Bible',
    downloadUrl: 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_web.json',
    size: '4.2 MB'
  },
  {
    id: 'asv',
    name: 'ASV',
    fullName: 'American Standard Version',
    downloadUrl: 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_asv.json',
    size: '4.3 MB'
  },
  {
    id: 'bbe',
    name: 'BBE',
    fullName: 'Bible in Basic English',
    downloadUrl: 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_bbe.json',
    size: '3.8 MB'
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

export const downloadBibleVersion = async (
  version: BibleVersion,
  onProgress?: (progress: number) => void
): Promise<boolean> => {
  try {
    const versionInfo = BIBLE_VERSIONS.find(v => v.id === version)
    if (!versionInfo) return false

    const file = getBibleFile(version)
    
    // Download the file
    const response = await fetch(versionInfo.downloadUrl)
    if (!response.ok) return false
    
    const totalBytes = parseInt(response.headers.get('content-length') || '0', 10)
    const reader = response.body?.getReader()
    if (!reader) return false
    
    const chunks: Uint8Array[] = []
    let receivedBytes = 0
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      chunks.push(value)
      receivedBytes += value.length
      
      if (totalBytes > 0 && onProgress) {
        onProgress(receivedBytes / totalBytes)
      }
    }
    
    // Combine chunks and write to file
    const combinedArray = new Uint8Array(receivedBytes)
    let position = 0
    for (const chunk of chunks) {
      combinedArray.set(chunk, position)
      position += chunk.length
    }
    
    const blob = new Blob([combinedArray])
    const text = await blob.text()
    await file.write(text)
    
    return true
  } catch (error) {
    console.error(`Error downloading ${version}:`, error)
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

export const loadBibleData = async (version: BibleVersion = 'kjv'): Promise<BibleBook[]> => {
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
    console.error('Error loading Bible data:', error)
    return []
  }
}

export const getBibleBooks = async (version: BibleVersion = 'kjv'): Promise<BibleBook[]> => {
  return await loadBibleData(version)
}

export const getBook = async (bookIndex: number, version: BibleVersion = 'kjv'): Promise<BibleBook | null> => {
  const books = await loadBibleData(version)
  return books[bookIndex] || null
}

export const getChapter = async (bookIndex: number, chapterIndex: number, version: BibleVersion = 'kjv'): Promise<string[] | null> => {
  const book = await getBook(bookIndex, version)
  if (!book) return null
  return book.chapters[chapterIndex] || null
}

// Fetch chapter from API when not downloaded
export const fetchChapterFromAPI = async (
  bookName: string,
  chapterNum: number,
  version: BibleVersion = 'kjv'
): Promise<string[] | null> => {
  try {
    const response = await fetch(`https://bible-api.com/${encodeURIComponent(bookName)}+${chapterNum}?translation=${version}`)
    
    if (!response.ok) return null
    
    const data = await response.json()
    
    // bible-api.com returns verses in format with verse numbers
    // Parse them into array
    if (data.verses && Array.isArray(data.verses)) {
      return data.verses.map((v: any) => v.text)
    }
    
    return null
  } catch (error) {
    console.error('Error fetching chapter from API:', error)
    return null
  }
}

export const getVerse = async (bookIndex: number, chapterIndex: number, verseIndex: number, version: BibleVersion = 'kjv'): Promise<string | null> => {
  const chapter = await getChapter(bookIndex, chapterIndex, version)
  if (!chapter) return null
  return chapter[verseIndex] || null
}

// Helper to get book categories
export const getOldTestamentBooks = async (version: BibleVersion = 'kjv'): Promise<BibleBook[]> => {
  const books = await loadBibleData(version)
  return books.slice(0, 39) // First 39 books are Old Testament
}

export const getNewTestamentBooks = async (version: BibleVersion = 'kjv'): Promise<BibleBook[]> => {
  const books = await loadBibleData(version)
  return books.slice(39) // Last 27 books are New Testament
}

export const getBookIndex = async (bookName: string, version: BibleVersion = 'kjv'): Promise<number> => {
  const books = await loadBibleData(version)
  return books.findIndex(book => 
    book.name.toLowerCase() === bookName.toLowerCase() ||
    book.abbrev.toLowerCase() === bookName.toLowerCase()
  )
}

// Static book list for when offline and not downloaded (66 standard Bible books)
export const BOOK_NAMES = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
  'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
]

// Popular books for quick access
export const getPopularBooks = (): { name: string; index: number }[] => {
  return [
    { name: 'Psalms', index: 18 },
    { name: 'Proverbs', index: 19 },
    { name: 'Matthew', index: 39 },
    { name: 'John', index: 42 },
    { name: 'Romans', index: 44 },
    { name: 'Genesis', index: 0 }
  ]
}
