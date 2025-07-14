import { Question, Difficulty } from '@/types'

/**
 * 问题模板接口
 */
export interface QuestionTemplate {
  id: string
  category: 'general' | 'japan-specific' | 'technical'
  subcategory?: string
  question: {
    zh: string
    ja: string
  }
  answer: {
    zh: string
    ja: string
  }
  tags: string[]
  difficulty: Difficulty
}

/**
 * 技术问题子分类映射
 */
export const TECHNICAL_SUBCATEGORIES = {
  java: 'Java开发',
  frontend: '前端开发', 
  backend: '后端开发',
  database: '数据库技术',
  cloud: '云计算技术',
  'system-design': '系统设计',
  devops: 'DevOps运维',
  security: '网络安全',
  algorithms: '算法数据结构'
} as const

/**
 * 通用问题子分类映射
 */
export const GENERAL_SUBCATEGORIES = {
  'self-intro': '自我介绍',
  'strengths-weaknesses': '优缺点分析',
  'career-goals': '职业规划',
  'motivation': '动机与目标'
} as const

/**
 * 问题模板示例
 */
export const QUESTION_TEMPLATES = {
  // 通用问题模板
  general: {
    id: 'template-general-{number}',
    category: 'general' as const,
    subcategory: 'self-intro',
    question: {
      zh: '[中文问题]',
      ja: '[日本語質問]'
    },
    answer: {
      zh: '[中文答案要点：1. 要点一；2. 要点二；3. 要点三]',
      ja: '[日本語回答のポイント：1. ポイント一；2. ポイント二；3. ポイント三]'
    },
    tags: ['标签1', '标签2'],
    difficulty: 'easy' as Difficulty
  },

  // 日本特色问题模板
  japanSpecific: {
    id: 'template-japan-{number}',
    category: 'japan-specific' as const,
    question: {
      zh: '[关于日本文化/工作方式的问题]',
      ja: '[日本の文化・働き方に関する質問]'
    },
    answer: {
      zh: '[展示对日本文化的理解和适应能力]',
      ja: '[日本文化への理解と適応力を示す回答]'
    },
    tags: ['日本文化', '工作文化'],
    difficulty: 'medium' as Difficulty
  },

  // 技术问题模板
  technical: {
    id: 'template-tech-{subcategory}-{number}',
    category: 'technical' as const,
    subcategory: 'java', // 需要根据具体技术类型修改
    question: {
      zh: '[技术问题 - 中文]',
      ja: '[技術質問 - 日本語]'
    },
    answer: {
      zh: '[技术回答 - 包含原理、优势、应用场景等]',
      ja: '[技術回答 - 原理、メリット、適用シーンなどを含む]'
    },
    tags: ['技术标签1', '技术标签2'],
    difficulty: 'medium' as Difficulty
  }
}

/**
 * 生成问题ID的辅助函数
 */
export function generateQuestionId(
  category: string, 
  subcategory?: string, 
  number?: number
): string {
  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substr(2, 5)
  
  if (subcategory) {
    return `${category}-${subcategory}-${number || timestamp}-${randomSuffix}`
  }
  return `${category}-${number || timestamp}-${randomSuffix}`
}

/**
 * 验证问题数据的辅助函数
 */
export function validateQuestion(question: QuestionTemplate): boolean {
  // 检查必填字段
  if (!question.id || !question.category) {
    return false
  }
  
  // 检查问题和答案是否有中日文版本
  if (!question.question.zh || !question.question.ja) {
    return false
  }
  
  if (!question.answer.zh || !question.answer.ja) {
    return false
  }
  
  // 检查标签和难度
  if (!question.tags || question.tags.length === 0) {
    return false
  }
  
  if (!['easy', 'medium', 'hard'].includes(question.difficulty)) {
    return false
  }
  
  return true
} 