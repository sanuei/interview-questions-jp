'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { TTSSettings } from '@/components/TTSSettings'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { questions } from '@/data/questions'

export default function QuestionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const { rateQuestion, getRating } = useRating()
  const [showTTSSettings, setShowTTSSettings] = useState(false)

  const questionId = params.id as string
  const question = questions.find(q => q.id === questionId)
  
  // 获取当前问题在所有问题中的索引
  const currentIndex = questions.findIndex(q => q.id === questionId)
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null
  const nextQuestion = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null

  const handlePrevQuestion = () => {
    if (prevQuestion) {
      router.push(`/questions/${prevQuestion.id}`)
    }
  }

  const handleNextQuestion = () => {
    if (nextQuestion) {
      router.push(`/questions/${nextQuestion.id}`)
    }
  }

  // 键盘导航支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault()
            handlePrevQuestion()
            break
          case 'ArrowRight':
            event.preventDefault()
            handleNextQuestion()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevQuestion, nextQuestion])

  // 如果找不到问题，显示404
  if (!question) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'zh' ? '问题未找到' : '質問が見つかりません'}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === 'zh' 
              ? '抱歉，您访问的问题不存在或已被删除。'
              : '申し訳ございません。アクセスしようとした質問は存在しないか、削除されています。'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push('/questions')}>
              {language === 'zh' ? '返回问题列表' : '質問リストに戻る'}
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              {language === 'zh' ? '回到首页' : 'ホームに戻る'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo 
                language={language} 
                onClick={() => router.push('/')}
              />
              <div className="h-6 w-px bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'zh' ? '返回' : '戻る'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTTSSettings(true)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {language === 'zh' ? '语音设置' : '音声設定'}
              </Button>
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6" style={{ width: '80%' }}>
        <div className="space-y-6">
          {/* Question Info */}
          <div className="text-sm text-gray-500">
            {language === 'zh' ? '问题详情' : '質問詳細'}
            <span className="ml-2 text-xs text-gray-400">
              (ID: {question.id})
            </span>
          </div>

          {/* Question Card */}
          <QuestionCard
            question={question}
            globalLanguage={language}
            userRating={getRating(question.id)}
            onRate={(rating) => rateQuestion(question.id, rating)}
            className="w-full"
          />

          {/* Question Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {language === 'zh' 
                ? `第 ${currentIndex + 1} 题，共 ${questions.length} 题`
                : `${currentIndex + 1} / ${questions.length} 問題`
              }
              <div className="text-xs opacity-70 mt-1">
                {language === 'zh' ? '(Ctrl+←/→ 切换)' : '(Ctrl+←/→で切り替え)'}
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevQuestion}
                disabled={!prevQuestion}
                className="flex items-center gap-1 flex-1 sm:flex-none"
              >
                <ChevronLeft className="w-4 h-4" />
                {language === 'zh' ? '上一题' : '前の問題'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextQuestion}
                disabled={!nextQuestion}
                className="flex items-center gap-1 flex-1 sm:flex-none"
              >
                {language === 'zh' ? '下一题' : '次の問題'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/questions')}
              className="flex-1 sm:flex-none"
            >
              {language === 'zh' ? '返回问题列表' : '質問リストに戻る'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/categories')}
              className="flex-1 sm:flex-none"
            >
              {language === 'zh' ? '选择其他分类' : '他のカテゴリを選択'}
            </Button>
          </div>
        </div>
      </div>

      {/* TTS Settings Modal */}
      {showTTSSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <TTSSettings 
              language={language} 
              onClose={() => setShowTTSSettings(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
} 