'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Grid, BookOpen } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import QuestionSidebar from '@/components/QuestionSidebar'
import QuestionListPage from '@/components/QuestionListPage'
import HomePageComponent from '@/components/HomePage'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { questions } from '@/data/questions'

export default function HomePage() {
  const { language, toggleLanguage } = useLanguage()
  const { rateQuestion, getRating } = useRating()

  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'study' | 'list'>('home')

  // 显示所有问题，由侧边栏组件内部处理筛选
  const allQuestions = questions

  // 设置默认显示第一个问题
  const currentQuestion = currentQuestionId 
    ? allQuestions.find(q => q.id === currentQuestionId)
    : allQuestions[0]

  const currentIndex = currentQuestion 
    ? allQuestions.findIndex(q => q.id === currentQuestion.id)
    : 0

  const handleQuestionSelect = (questionId: string) => {
    setCurrentQuestionId(questionId)
  }

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentQuestionId(allQuestions[currentIndex - 1].id)
    }
  }, [currentIndex, allQuestions])

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentQuestionId(allQuestions[currentIndex + 1].id)
    }
  }, [currentIndex, allQuestions])

  // 检测移动端设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
  }, [currentIndex, allQuestions.length, handlePrevQuestion, handleNextQuestion])



  // 如果是主页，显示主页
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <Logo 
                language={language} 
                onClick={() => setCurrentView('home')}
              />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </header>
        
        <HomePageComponent
          language={language}
          onStartStudy={() => setCurrentView('study')}
          onViewAllQuestions={() => setCurrentView('list')}
        />
      </div>
    )
  }

  // 如果是列表视图，显示问题列表页面
  if (currentView === 'list') {
    return (
      <QuestionListPage
        questions={questions}
        onQuestionSelect={(questionId) => {
          setCurrentQuestionId(questionId)
          setCurrentView('study')
        }}
        onBack={() => setCurrentView('study')}
        onHome={() => setCurrentView('home')}
      />
    )
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Logo 
              language={language} 
              onClick={() => setCurrentView('home')}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('list')}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                {language === 'zh' ? '所有问题' : 'すべての質問'}
              </Button>
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'w-0' : isMobile ? 'w-72' : 'w-80'} overflow-hidden`}>
          <QuestionSidebar
            questions={allQuestions}
            currentQuestionId={currentQuestion?.id || null}
            onQuestionSelect={handleQuestionSelect}
            onShowAllQuestions={() => setCurrentView('list')}
            language={language}
          />
        </div>

        {/* Sidebar Toggle Button */}
        <div className="flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-full rounded-none border-y-0 border-r-0 px-2 border-gray-200"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Question Display Area */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
              {currentQuestion ? (
                <div className="space-y-6">
                  {/* Question Progress */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <div className="text-sm text-gray-500">
                      {language === 'zh' 
                        ? `第 ${currentIndex + 1} 题，共 ${allQuestions.length} 题`
                        : `${currentIndex + 1} / ${allQuestions.length} 問題`
                      }
                      {!isMobile && (
                        <span className="text-xs ml-2 opacity-70">
                          {language === 'zh' ? '(Ctrl+←/→ 切换)' : '(Ctrl+←/→で切り替え)'}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        onClick={handlePrevQuestion}
                        disabled={currentIndex === 0}
                        className={isMobile ? "flex-1" : ""}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        {language === 'zh' ? '上一题' : '前の問題'}
                      </Button>
                      <Button
                        variant="outline"
                        size={isMobile ? "default" : "sm"}
                        onClick={handleNextQuestion}
                        disabled={currentIndex === allQuestions.length - 1}
                        className={isMobile ? "flex-1" : ""}
                      >
                        {language === 'zh' ? '下一题' : '次の問題'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Question Card */}
                  <QuestionCard
                    question={currentQuestion}
                    globalLanguage={language}
                    userRating={getRating(currentQuestion.id)}
                    onRate={(rating) => rateQuestion(currentQuestion.id, rating)}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'zh' ? '选择一个问题开始学习' : '学習を始める質問を選択してください'}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'zh' 
                      ? '从左侧导航中选择一个分类和问题'
                      : '左のナビゲーションからカテゴリと質問を選択してください'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
