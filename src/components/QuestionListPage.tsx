'use client'

import { useState, useMemo } from 'react'
import { Question, Category } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { QuestionCard } from '@/components/QuestionCard'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Grid, List, Search, User, Building2, Code, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories } from '@/data/categories'

interface QuestionListPageProps {
  questions: Question[]
  onQuestionSelect: (questionId: string) => void
  onBack: () => void
  onHome: () => void
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
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
        </div>
      </header>

      {/* Content Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900">
              {language === 'zh' ? '所有问题' : 'すべての質問'}
            </h1>
            <Badge variant="secondary" className="text-sm">
              {filteredAndSortedQuestions.length} {language === 'zh' ? '个问题' : '問題'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'zh' ? '搜索问题、答案或标签...' : '質問、回答、タグを検索...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
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

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {language === 'zh' ? '排序：' : 'ソート：'}
            </span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('rating')}
                className="text-xs"
              >
                {language === 'zh' ? '评分' : '評価'}
              </Button>
              <Button
                variant={sortBy === 'difficulty' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('difficulty')}
                className="text-xs"
              >
                {language === 'zh' ? '难度' : '難易度'}
              </Button>
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('newest')}
                className="text-xs"
              >
                {language === 'zh' ? '最新' : '最新'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        {filteredAndSortedQuestions.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'zh' ? '没有找到匹配的问题' : '一致する質問が見つかりませんでした'}
            </h3>
            <p className="text-gray-500">
              {language === 'zh' 
                ? '尝试调整搜索条件或筛选器'
                : '検索条件やフィルターを調整してみてください'
              }
            </p>
          </div>
        ) : (
          <div className={cn(
            "gap-6",
            viewMode === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
              : "flex flex-col max-w-4xl mx-auto"
          )}>
            {filteredAndSortedQuestions.map((question: Question) => (
              <div
                key={question.id}
                className={cn(
                  "cursor-pointer transition-transform hover:scale-[1.02]",
                  viewMode === 'list' && "mb-4"
                )}
                onClick={() => onQuestionSelect(question.id)}
              >
                <QuestionCard
                  question={question}
                  globalLanguage={language}
                  userRating={getRating(question.id)}
                  onRate={(rating) => rateQuestion(question.id, rating)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 