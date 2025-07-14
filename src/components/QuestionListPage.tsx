'use client'

import { useState, useMemo } from 'react'
import { Question, Category } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StarRating } from '@/components/StarRating'
import { TTSSettings } from '@/components/TTSSettings'
import { ArrowLeft, Grid, List, Search, User, Building2, Code, SlidersHorizontal, Tag, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories } from '@/data/categories'
import { translateTags } from '@/lib/tagTranslations'

interface QuestionListPageProps {
  questions: Question[]
  onQuestionSelect: (questionId: string) => void
  onBack: () => void
  onHome: () => void
}

// 简化的问题卡片组件，专门用于问题列表页面
function QuestionListCard({ 
  question, 
  language, 
  userRating, 
  onRate,
  onClick,
  className 
}: {
  question: Question
  language: 'zh' | 'ja'
  userRating: number
  onRate: (rating: number) => void
  onClick: () => void
  className?: string
}) {
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

  return (
    <Card 
      className={cn("hover:shadow-lg transition-all cursor-pointer bg-white border border-gray-200 hover:border-gray-300", className)}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <CardTitle className="text-base font-semibold leading-snug text-gray-900 flex-1 line-clamp-2">
            {question.question[language]}
          </CardTitle>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium flex-shrink-0",
            difficultyColors[question.difficulty]
          )}>
            {difficultyLabels[language][question.difficulty]}
          </span>
        </div>
        
        {question.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="w-3 h-3 text-gray-500" />
            {translateTags(question.tags, language).slice(0, 3).map((tag, index) => (
              <span
                key={`${question.id}-tag-${index}`}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
            {question.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                +{question.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {language === 'zh' ? '为这个问题评分：' : 'この質問を評価：'}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <StarRating
              rating={userRating}
              onRate={onRate}
              size="sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function QuestionListPage({
  questions,
  onQuestionSelect,
  onBack,
  onHome
}: QuestionListPageProps) {
  const { language, toggleLanguage } = useLanguage()
  const { rateQuestion, getRating } = useRating()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'difficulty'>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTTSSettings, setShowTTSSettings] = useState(false)

  // 过滤和排序问题
  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions

    // 搜索过滤
    if (searchTerm.trim()) {
      filtered = filtered.filter(q => 
        q.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        q.answer[language].toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory)
    }

    // 按子分类筛选
    if (selectedSubcategory) {
      filtered = filtered.filter(q => q.subcategory === selectedSubcategory)
    }

    // 排序
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          const ratingA = getRating(a.id)
          const ratingB = getRating(b.id)
          return ratingB - ratingA
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0
      }
    })
  }, [questions, selectedCategory, selectedSubcategory, sortBy, searchTerm, language, getRating])

  const categoryIconMap = {
    general: User,
    'japan-specific': Building2,
    technical: Code
  } as const

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header - 与其他页面保持一致 */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo 
                language={language} 
                onClick={onHome}
              />
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === 'zh' ? '返回学习' : '学習に戻る'}
                </Button>
              </div>
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

      {/* Content Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-6" style={{ width: '80%' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'zh' ? '所有问题' : 'すべての質問'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'zh' 
                  ? `${filteredAndSortedQuestions.length} 个问题`
                  : `${filteredAndSortedQuestions.length} 件の質問`
                }
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                {language === 'zh' ? '网格' : 'グリッド'}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                {language === 'zh' ? '列表' : 'リスト'}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'zh' ? '搜索问题、答案或标签...' : '質問、回答、タグを検索...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-gray-900">
                {language === 'zh' ? '分类' : 'カテゴリ'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedSubcategory(null)
                  }}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {language === 'zh' ? '全部' : 'すべて'} ({questions.length})
                </button>

                {categories.map((category: Category) => {
                  const Icon = categoryIconMap[category.id as keyof typeof categoryIconMap] || Code
                  const categoryQuestions = questions.filter(q => q.category === category.id)
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedSubcategory(null)
                      }}
                      className={`px-3 py-1 rounded-md text-sm transition-all flex items-center gap-1 ${
                        selectedCategory === category.id
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {category.name[language]} ({categoryQuestions.length})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Subcategories - 显示技术面试的子分类 */}
            {selectedCategory === 'technical' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-900">
                  {language === 'zh' ? '技术领域' : '技術領域'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      selectedSubcategory === null
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {language === 'zh' ? '全部' : 'すべて'}
                  </button>
                  {categories.find(c => c.id === 'technical')?.subcategories?.map((subcategory) => {
                    const subcategoryQuestions = questions.filter(q => 
                      q.category === 'technical' && q.subcategory === subcategory.id
                    )
                    
                    return (
                      <button
                        key={subcategory.id}
                        onClick={() => setSelectedSubcategory(subcategory.id)}
                        className={`px-3 py-1 rounded-md text-sm transition-all ${
                          selectedSubcategory === subcategory.id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {subcategory.name[language]} ({subcategoryQuestions.length})
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 显示通用问题的子分类 */}
            {selectedCategory === 'general' && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 text-gray-900">
                  {language === 'zh' ? '问题类型' : '質問タイプ'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      selectedSubcategory === null
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {language === 'zh' ? '全部' : 'すべて'}
                  </button>
                  {categories.find(c => c.id === 'general')?.subcategories?.map((subcategory) => {
                    const subcategoryQuestions = questions.filter(q => 
                      q.category === 'general' && q.subcategory === subcategory.id
                    )
                    
                    return (
                      <button
                        key={subcategory.id}
                        onClick={() => setSelectedSubcategory(subcategory.id)}
                        className={`px-3 py-1 rounded-md text-sm transition-all ${
                          selectedSubcategory === subcategory.id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {subcategory.name[language]} ({subcategoryQuestions.length})
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {language === 'zh' ? '排序' : 'ソート'}:
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    sortBy === 'rating'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {language === 'zh' ? '评分' : '評価'}
                </button>
                <button
                  onClick={() => setSortBy('difficulty')}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    sortBy === 'difficulty'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {language === 'zh' ? '难度' : '難易度'}
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    sortBy === 'newest'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {language === 'zh' ? '最新' : '最新'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid/List */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-5xl mx-auto p-6" style={{ width: '80%' }}>
          {filteredAndSortedQuestions.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'zh' ? '未找到匹配的问题' : '一致する質問が見つかりません'}
              </h3>
              <p className="text-gray-500">
                {language === 'zh' 
                  ? '尝试调整搜索条件或筛选选项'
                  : '検索条件やフィルターオプションを調整してみてください'
                }
              </p>
            </div>
          ) : (
            <div className={cn(
              "gap-6",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col space-y-2"
            )}>
              {filteredAndSortedQuestions.map((question) => (
                <QuestionListCard
                  key={question.id}
                  question={question}
                  language={language}
                  userRating={getRating(question.id)}
                  onRate={(rating) => rateQuestion(question.id, rating)}
                  onClick={() => onQuestionSelect(question.id)}
                  className="h-full"
                />
              ))}
            </div>
          )}
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