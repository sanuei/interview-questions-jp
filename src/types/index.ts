export type Language = 'zh' | 'ja'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface LocalizedText {
  zh: string
  ja: string
}

export interface Question {
  id: string
  category: string
  subcategory?: string
  question: LocalizedText
  answer: LocalizedText
  tags: string[]
  difficulty: Difficulty
  averageRating?: number
}

export interface Category {
  id: string
  name: LocalizedText
  description: LocalizedText
  icon: string
  color: string
  subcategories?: Category[]
}

export interface UserRating {
  questionId: string
  rating: number
  timestamp: Date
}

export interface SearchFilters {
  category?: string
  difficulty?: Difficulty
  tags?: string[]
  sortBy?: 'rating' | 'newest' | 'difficulty'
  language?: Language
} 