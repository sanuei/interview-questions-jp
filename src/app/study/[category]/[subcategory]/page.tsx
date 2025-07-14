'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Grid, BookOpen, Settings } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import QuestionSidebar from '@/components/QuestionSidebar'
import CategorySwitcher from '@/components/CategorySwitcher'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { TTSSettings } from '@/components/TTSSettings'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { questions } from '@/data/questions'
import { categories } from '@/data/categories'

export default function StudySubcategoryPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language, toggleLanguage } = useLanguage()
  const { rateQuestion, getRating } = useRating()

  const selectedCategory = params.category as string
  const selectedSubcategory = params.subcategory as string
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    searchParams.get('question') || null
  )
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showTTSSettings, setShowTTSSettings] = useState(false)

  // 根据选择的分类和子分类筛选问题
  const filteredQuestions = questions.filter(q => {
    if (q.category !== selectedCategory) return false
    if (selectedSubcategory && q.subcategory !== selectedSubcategory) return false
    return true
  })

  // 设置默认显示第一个问题
  const currentQuestion = currentQuestionId 
    ? filteredQuestions.find(q => q.id === currentQuestionId)
    : filteredQuestions[0]

  const currentIndex = currentQuestion 
    ? filteredQuestions.findIndex(q => q.id === currentQuestion.id)
    : 0

  const handleQuestionSelect = (questionId: string) => {
    setCurrentQuestionId(questionId)
    // 更新URL参数
    const url = new URL(window.location.href)
    url.searchParams.set('question', questionId)
    router.replace(url.pathname + url.search)
  }

  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    if (subcategoryId) {
      router.push(`/study/${categoryId}/${subcategoryId}`)
    } else {
      router.push(`/study/${categoryId}`)
    }
  }

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      handleQuestionSelect(filteredQuestions[currentIndex - 1].id)
    }
  }, [currentIndex, filteredQuestions])

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < filteredQuestions.length - 1) {
      handleQuestionSelect(filteredQuestions[currentIndex + 1].id)
    }
  }, [currentIndex, filteredQuestions])

  // 获取所有可导航的分类和子分类
  const getAllNavigationItems = () => {
    const items: Array<{id: string, name: { zh: string; ja: string }, category: string, subcategory?: string}> = []
    
    categories.forEach(category => {
      if (category.subcategories && category.subcategories.length > 0) {
        // 如果有子分类，添加每个子分类
        category.subcategories.forEach(subcategory => {
          items.push({
            id: `${category.id}-${subcategory.id}`,
            name: subcategory.name,
            category: category.id,
            subcategory: subcategory.id
          })
        })
      } else {
        // 如果没有子分类，添加主分类
        items.push({
          id: category.id,
          name: category.name,
          category: category.id
        })
      }
    })
    
    return items
  }

  // 分类导航
  const navigationItems = getAllNavigationItems()
  const currentNavigationIndex = navigationItems.findIndex(item => 
    item.category === selectedCategory && item.subcategory === selectedSubcategory
  )

  const handlePrevCategory = () => {
    if (currentNavigationIndex > 0) {
      const prevItem = navigationItems[currentNavigationIndex - 1]
      handleCategorySelect(prevItem.category, prevItem.subcategory)
    }
  }

  const handleNextCategory = () => {
    if (currentNavigationIndex < navigationItems.length - 1) {
      const nextItem = navigationItems[currentNavigationIndex + 1]
      handleCategorySelect(nextItem.category, nextItem.subcategory)
    }
  }

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
  }, [handlePrevQuestion, handleNextQuestion])

  // 获取当前分类信息
  const currentCategoryInfo = categories.find(c => c.id === selectedCategory)
  const currentSubcategoryInfo = selectedSubcategory && currentCategoryInfo
    ? currentCategoryInfo.subcategories?.find(sc => sc.id === selectedSubcategory)
    : null

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo 
                language={language} 
                onClick={() => router.push('/')}
              />
              <div className="h-6 w-px bg-gray-200"></div>
              {currentCategoryInfo && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 flex-shrink-0">
                    {language === 'zh' ? '当前分类：' : '現在のカテゴリ：'}
                  </span>
                  <CategorySwitcher
                    language={language}
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    onCategoryChange={handleCategorySelect}
                    className="flex-1 min-w-0"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/questions')}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                {language === 'zh' ? '所有问题' : 'すべての質問'}
              </Button>
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

      {/* Category Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevCategory}
              disabled={currentNavigationIndex === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-3 h-3" />
              {language === 'zh' ? '上一分类' : '前のカテゴリ'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextCategory}
              disabled={currentNavigationIndex === navigationItems.length - 1}
              className="flex items-center gap-1"
            >
              {language === 'zh' ? '下一分类' : '次のカテゴリ'}
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/categories')}
            className="text-gray-600"
          >
            {language === 'zh' ? '切换分类' : 'カテゴリを切り替え'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'w-0' : isMobile ? 'w-72' : 'w-80'} overflow-hidden`}>
          <QuestionSidebar
            questions={filteredQuestions}
            currentQuestionId={currentQuestion?.id || null}
            onQuestionSelect={handleQuestionSelect}
            onShowAllQuestions={() => router.push('/questions')}
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
            <div className="max-w-5xl mx-auto p-6" style={{ width: '80%' }}>
              {currentQuestion ? (
                <div className="space-y-6">
                  {/* Question Progress */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <div className="text-sm text-gray-500">
                      {language === 'zh' 
                        ? `第 ${currentIndex + 1} 题，共 ${filteredQuestions.length} 题`
                        : `${currentIndex + 1} / ${filteredQuestions.length} 問題`
                      }
                      {(currentCategoryInfo || currentSubcategoryInfo) && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({currentSubcategoryInfo 
                            ? currentSubcategoryInfo.name[language]
                            : currentCategoryInfo?.name[language]
                          })
                        </span>
                      )}
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
                        disabled={currentIndex === filteredQuestions.length - 1}
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
                      ? '从左侧导航中选择一个问题，或者重新选择分类'
                      : '左のナビゲーションから質問を選択するか、カテゴリを再選択してください'
                    }
                  </p>
                </div>
              )}
            </div>
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