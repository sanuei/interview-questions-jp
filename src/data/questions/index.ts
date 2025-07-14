import { Question } from '@/types'
import { generalQuestions } from './general'
import { japanSpecificQuestions } from './japan-specific'
import { technicalQuestions } from './technical'

// 聚合所有问题
export const allQuestions: Question[] = [
  ...generalQuestions,
  ...japanSpecificQuestions,
  ...technicalQuestions
]

// 按分类导出
export {
  generalQuestions,
  japanSpecificQuestions,
  technicalQuestions
}

// 默认导出所有问题（保持向后兼容）
export default allQuestions

// 统计信息
export const questionStats = {
  total: allQuestions.length,
  byCategory: {
    general: generalQuestions.length,
    japanSpecific: japanSpecificQuestions.length,
    technical: technicalQuestions.length
  },
  lastUpdated: '2025-07-14T09:17:56.624Z'
}
