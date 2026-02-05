// Bible data types and utilities

export interface BibleBook {
  name: string
  abbrev: string
  chapters: string[][] // Array of chapters, each chapter is an array of verses
}

export interface BibleData {
  books: BibleBook[]
}

// Load and parse the Bible JSON
let bibleData: BibleBook[] | null = null

export const loadBibleData = (): BibleBook[] => {
  if (bibleData) return bibleData
  
  try {
    bibleData = require('./assets/bible-kjv.json') as BibleBook[]
    return bibleData
  } catch (error) {
    console.error('Error loading Bible data:', error)
    return []
  }
}

export const getBibleBooks = (): BibleBook[] => {
  return loadBibleData()
}

export const getBook = (bookIndex: number): BibleBook | null => {
  const books = loadBibleData()
  return books[bookIndex] || null
}

export const getChapter = (bookIndex: number, chapterIndex: number): string[] | null => {
  const book = getBook(bookIndex)
  if (!book) return null
  return book.chapters[chapterIndex] || null
}

export const getVerse = (bookIndex: number, chapterIndex: number, verseIndex: number): string | null => {
  const chapter = getChapter(bookIndex, chapterIndex)
  if (!chapter) return null
  return chapter[verseIndex] || null
}

// Helper to get book categories
export const getOldTestamentBooks = (): BibleBook[] => {
  return loadBibleData().slice(0, 39) // First 39 books are Old Testament
}

export const getNewTestamentBooks = (): BibleBook[] => {
  return loadBibleData().slice(39) // Last 27 books are New Testament
}

export const getBookIndex = (bookName: string): number => {
  const books = loadBibleData()
  return books.findIndex(book => 
    book.name.toLowerCase() === bookName.toLowerCase() ||
    book.abbrev.toLowerCase() === bookName.toLowerCase()
  )
}

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
