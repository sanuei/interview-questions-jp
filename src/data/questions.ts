import { Question } from '@/types'
import { allQuestions } from './questions/index'

// 导出所有问题，保持向后兼容性
export const questions: Question[] = allQuestions

// 也可以按分类导出（可选）
export { generalQuestions, japanSpecificQuestions, technicalQuestions } from './questions/index' 