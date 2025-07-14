'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Tag } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/StarRating'
import { Question, Language } from '@/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  language: Language
  userRating: number
  onRate: (rating: number) => void
  className?: string
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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
  language, 
  userRating, 
  onRate, 
  className 
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-relaxed">
            {question.question[language]}
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              difficultyColors[question.difficulty]
            )}>
              {difficultyLabels[language][question.difficulty]}
            </span>
          </div>
        </div>
        
        {question.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            <Tag className="w-3 h-3 text-muted-foreground" />
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Button
          variant="outline"
          onClick={() => setIsAnswerVisible(!isAnswerVisible)}
          className="w-full mb-4 justify-between"
        >
          {language === 'zh' ? '查看答案' : '回答を見る'}
          {isAnswerVisible ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {isAnswerVisible && (
          <div className="bg-muted/50 rounded-lg p-4 prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {question.answer[language]}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {language === 'zh' ? '为这个问题评分：' : 'この質問を評価：'}
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