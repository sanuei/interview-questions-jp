'use client'

import { useRouter } from 'next/navigation'
import QuestionListPage from '@/components/QuestionListPage'
import { questions } from '@/data/questions'

export default function QuestionsPage() {
  const router = useRouter()

  const handleQuestionSelect = (questionId: string) => {
    router.push(`/questions/${questionId}`)
  }

  const handleBack = () => {
    router.back()
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    <QuestionListPage
      questions={questions}
      onQuestionSelect={handleQuestionSelect}
      onBack={handleBack}
      onHome={handleHome}
    />
  )
} 