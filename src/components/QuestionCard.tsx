'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Tag, Languages, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StarRating } from '@/components/StarRating'
import { Question, Language } from '@/types'
import { cn } from '@/lib/utils'
import { translateTags } from '@/lib/tagTranslations'
import { ttsService } from '@/lib/ttsService'

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
  const [isReading, setIsReading] = useState(false)
  const [readingType, setReadingType] = useState<'question' | 'answer' | null>(null)

  // 处理朗读功能
  const handleSpeak = async (text: string, type: 'question' | 'answer') => {
    if (isReading) {
      // 如果正在朗读，停止朗读
      ttsService.stop()
      setIsReading(false)
      setReadingType(null)
      return
    }

    try {
      setIsReading(true)
      setReadingType(type)
      
      await ttsService.speak({
        text,
        language: cardLanguage,
        service: ttsService.getRecommendedService(),
        rate: 0.9,
        pitch: 1.0,
        volume: 0.8
      })
      
      setIsReading(false)
      setReadingType(null)
    } catch (error) {
      console.error('TTS Error:', error)
      setIsReading(false)
      setReadingType(null)
      
      // 可以添加错误提示
      alert(cardLanguage === 'zh' ? '朗读功能不可用' : '読み上げ機能が利用できません')
    }
  }

  // 获取翻译后的标签
  const translatedTags = translateTags(question.tags, cardLanguage)

  // 组件卸载时停止朗读
  useEffect(() => {
    return () => {
      if (isReading) {
        ttsService.stop()
      }
    }
  }, [isReading])

  return (
    <Card className={cn("hover:shadow-lg transition-shadow bg-white border border-gray-200", className)}>
      <CardHeader className="bg-white pb-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-semibold leading-snug text-gray-900 flex-1 line-clamp-2">
            {question.question[cardLanguage]}
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 朗读问题按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSpeak(question.question[cardLanguage], 'question')}
              className="px-2 py-1 h-6 text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
              title={cardLanguage === 'zh' ? '朗读问题' : '質問を読み上げ'}
              disabled={!ttsService.checkSupport()}
            >
              {isReading && readingType === 'question' ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </Button>
            
            {/* 翻译按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCardLanguage(cardLanguage === 'zh' ? 'ja' : 'zh')}
              className="px-2 py-1 h-6 text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
              title={cardLanguage === 'zh' ? '切换到日语' : '中国語に切り替え'}
            >
              <Languages className="w-3 h-3 mr-1" />
              {cardLanguage === 'zh' ? '日' : '中'}
            </Button>
            
            {/* 难度标签 */}
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              difficultyColors[question.difficulty]
            )}>
              {difficultyLabels[cardLanguage][question.difficulty]}
            </span>
          </div>
        </div>
        
        {question.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-3">
            <Tag className="w-3 h-3 text-gray-500" />
            {translatedTags.slice(0, 3).map((tag, index) => (
              <span
                key={`${question.id}-tag-${index}`}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
            {translatedTags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                +{translatedTags.length - 3}
              </span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="bg-white pt-0 pb-4">
        <Button
          variant="outline"
          onClick={() => setIsAnswerVisible(!isAnswerVisible)}
          className="w-full mb-3 justify-between border-gray-300 text-gray-700 hover:bg-gray-50 h-9"
        >
          {cardLanguage === 'zh' ? '查看答案' : '回答を見る'}
          {isAnswerVisible ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {isAnswerVisible && (
          <div className="bg-gray-50 rounded-lg p-3 prose prose-sm max-w-none">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">
                {cardLanguage === 'zh' ? '答案' : '回答'}
              </span>
              {/* 朗读答案按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSpeak(question.answer[cardLanguage], 'answer')}
                className="px-2 py-1 h-6 text-xs text-gray-600 hover:bg-gray-200"
                title={cardLanguage === 'zh' ? '朗读答案' : '回答を読み上げ'}
                disabled={!ttsService.checkSupport()}
              >
                {isReading && readingType === 'answer' ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
              {question.answer[cardLanguage]}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between bg-white pt-0 pb-4">
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