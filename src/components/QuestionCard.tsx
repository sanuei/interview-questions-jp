'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Tag, Languages } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/StarRating'
import { Question, Language } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  globalLanguage: Language
  userRating: number
  onRate: (rating: number) => void
  className?: string
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
}

const difficultyLabels = {
  zh: {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  },
  ja: {
    easy: '易しい',
    medium: '普通',
    hard: '難しい'
  }
}

export function QuestionCard({ 
  question, 
  globalLanguage, 
  userRating, 
  onRate,
  className 
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [cardLanguage, setCardLanguage] = useState<Language>(globalLanguage)

  return (
    <Card className={cn("hover:shadow-lg transition-shadow bg-white border border-gray-200", className)}>
      <CardHeader className="bg-white">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-relaxed text-gray-900">
            {question.question[cardLanguage]}
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCardLanguage(cardLanguage === 'zh' ? 'ja' : 'zh')}
              className="px-2 py-1 h-7 text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
              title={cardLanguage === 'zh' ? '切换到日语' : '中国語に切り替え'}
            >
              <Languages className="w-3 h-3 mr-1" />
              {cardLanguage === 'zh' ? '日' : '中'}
            </Button>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              difficultyColors[question.difficulty]
            )}>
              {difficultyLabels[cardLanguage][question.difficulty]}
            </span>
          </div>
        </div>
        
        {question.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            <Tag className="w-3 h-3 text-gray-500" />
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="bg-white">
        <Button
          variant="outline"
          onClick={() => setIsAnswerVisible(!isAnswerVisible)}
          className="w-full mb-4 justify-between border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {cardLanguage === 'zh' ? '查看答案' : '回答を見る'}
          {isAnswerVisible ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {isAnswerVisible && (
          <div className="bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {question.answer[cardLanguage]}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-white">
        <div className="text-sm text-gray-500">
          {cardLanguage === 'zh' ? '为这个问题评分：' : 'この質問を評価：'}
        </div>
        <StarRating
          rating={userRating}
          onRate={onRate}
          size="sm"
        />
      </CardFooter>
    </Card>
  )
} 