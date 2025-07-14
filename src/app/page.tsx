'use client'

import { useState, useMemo } from 'react'
import { Filter, BookOpen, Code, Building2, User } from 'lucide-react'
import { QuestionCard } from '@/components/QuestionCard'
import { CategoryCard } from '@/components/CategoryCard'
import { SearchAndFilter } from '@/components/SearchAndFilter'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useLanguage } from '@/hooks/useLanguage'
import { useRating } from '@/hooks/useRating'
import { questions } from '@/data/questions'
import { categories } from '@/data/categories'
import { Question, Category } from '@/types'

export default function HomePage() {
  const { language, toggleLanguage } = useLanguage()
  const { rateQuestion, getRating } = useRating()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'difficulty'>('rating')

  // 过滤和排序问题
  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = questions.filter(q => q.category === selectedCategory)
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
  }, [selectedCategory, sortBy, getRating])

  const categoryIconMap: Record<string, typeof User> = {
    general: User,
    'japan-specific': Building2,
    technical: Code
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
             {/* Header */}
       <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
         <div className="container mx-auto px-4 py-4">
           <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-3 min-w-0 flex-1">
               <div className="p-2 bg-blue-600 rounded-lg flex-shrink-0">
                 <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
               </div>
               <div className="min-w-0">
                 <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                   {language === 'zh' ? 'IT面试问题库' : 'IT面接質問集'}
                 </h1>
                 <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                   {language === 'zh' ? '帮助您准备IT面试' : 'IT面接の準備をサポート'}
                 </p>
               </div>
             </div>
             <LanguageToggle language={language} onToggle={toggleLanguage} />
           </div>
         </div>
       </header>

      <div className="container mx-auto px-4 py-8">
                 {/* Hero Section */}
         <div className="text-center mb-8 sm:mb-12">
           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
             {language === 'zh' ? '全面的IT面试准备平台' : '包括的なIT面接準備プラットフォーム'}
           </h2>
           <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
             {language === 'zh' 
               ? '提供分类整理的面试问题，支持中日文切换，帮助您在IT面试中脱颖而出'
               : 'カテゴリ別に整理された面接質問を提供し、中日文切り替えをサポートして、IT面接での成功をお手伝いします'
             }
           </p>
         </div>

                 {/* Categories */}
         <div className="mb-8">
           <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
             {language === 'zh' ? '选择分类' : 'カテゴリを選択'}
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <CategoryCard
               category="all"
               icon={Filter}
               questionCount={questions.length}
               language={language}
               isSelected={selectedCategory === 'all'}
               onClick={() => setSelectedCategory('all')}
             />

             {categories.map((category: Category) => {
               const Icon = categoryIconMap[category.id] || Code
               const categoryQuestions = questions.filter(q => q.category === category.id)
               
               return (
                 <CategoryCard
                   key={category.id}
                   category={category}
                   icon={Icon}
                   questionCount={categoryQuestions.length}
                   language={language}
                   isSelected={selectedCategory === category.id}
                   onClick={() => setSelectedCategory(category.id)}
                 />
               )
             })}
           </div>
         </div>

                 {/* Filters */}
         <SearchAndFilter
           language={language}
           sortBy={sortBy}
           onSortChange={setSortBy}
           className="mb-6"
         />

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedQuestions.map((question: Question) => (
            <QuestionCard
              key={question.id}
              question={question}
              language={language}
              userRating={getRating(question.id)}
              onRate={(rating) => rateQuestion(question.id, rating)}
            />
          ))}
        </div>

        {filteredAndSortedQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'zh' ? '没有找到相关问题' : '関連する質問が見つかりませんでした'}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>
              {language === 'zh' 
                ? '© 2024 IT面试问题库. 帮助您准备成功的IT面试.' 
                : '© 2024 IT面接質問集. 成功するIT面接の準備をサポートします.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
