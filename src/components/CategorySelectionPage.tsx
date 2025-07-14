'use client'

import { useState } from 'react'
import { Language, Category } from '@/types'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { CategoryCard } from '@/components/CategoryCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User, Building2, Code, ChevronRight } from 'lucide-react'
import { categories } from '@/data/categories'
import { questions } from '@/data/questions'

interface CategorySelectionPageProps {
  language: Language
  onToggleLanguage: () => void
  onBack: () => void
  onCategorySelect: (categoryId: string, subcategoryId?: string) => void
}

export default function CategorySelectionPage({
  language,
  onToggleLanguage,
  onBack,
  onCategorySelect
}: CategorySelectionPageProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [showSubcategories, setShowSubcategories] = useState(false)

  const categoryIconMap = {
    general: User,
    'japan-specific': Building2,
    technical: Code
  } as const

  const subcategoryIconMap = {
    'self-intro': User,
    'strengths-weaknesses': User,
    'career-goals': User,
    'java': Code,
    'frontend': Code,
    'backend': Code,
    'database': Code,
    'cloud': Code,
    'system-design': Code,
    'devops': Code,
    'security': Code,
    'algorithms': Code
  } as const

  const content = {
    zh: {
      title: '选择学习分类',
      subtitle: '请选择您想要学习的面试问题分类',
      description: '每个分类都包含精心整理的面试问题，帮助您针对性地准备面试',
      selectSubcategory: '选择技术领域',
      selectSubcategoryDesc: '选择您想要重点学习的技术领域',
      backToCategories: '返回分类选择'
    },
    ja: {
      title: '学習カテゴリを選択',
      subtitle: '学習したい面接問題のカテゴリを選択してください',
      description: '各カテゴリには厳選された面接問題が含まれており、面接準備に役立ちます',
      selectSubcategory: '技術領域を選択',
      selectSubcategoryDesc: '重点的に学習したい技術領域を選択してください',
      backToCategories: 'カテゴリ選択に戻る'
    }
  }

  // 计算问题数量的辅助函数
  const getQuestionCount = (categoryId: string, subcategoryId?: string) => {
    if (subcategoryId) {
      return questions.filter(q => q.category === categoryId && q.subcategory === subcategoryId).length
    } else {
      return questions.filter(q => q.category === categoryId).length
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    
    if (category && category.subcategories && category.subcategories.length > 0) {
      // 如果有子分类，显示子分类选择界面
      setSelectedMainCategory(categoryId)
      setShowSubcategories(true)
    } else {
      // 如果没有子分类，直接选择
      onCategorySelect(categoryId)
    }
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedMainCategory) {
      onCategorySelect(selectedMainCategory, subcategoryId)
    }
  }

  const handleBackToCategories = () => {
    setShowSubcategories(false)
    setSelectedMainCategory(null)
  }

  // 如果显示子分类选择界面
  if (showSubcategories && selectedMainCategory) {
    const mainCategory = categories.find(c => c.id === selectedMainCategory)
    
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Logo 
                  language={language} 
                  onClick={onBack}
                />
                <div className="h-6 w-px bg-gray-200"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToCategories}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {content[language].backToCategories}
                </Button>
              </div>
              <LanguageToggle language={language} onToggle={onToggleLanguage} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content[language].selectSubcategory}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {content[language].selectSubcategoryDesc}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>{mainCategory?.name[language]}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{content[language].selectSubcategory}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategory?.subcategories?.map((subcategory) => {
              const Icon = subcategoryIconMap[subcategory.id as keyof typeof subcategoryIconMap] || Code
              const questionCount = getQuestionCount(selectedMainCategory, subcategory.id)
              
              return (
                <div key={subcategory.id} className="transform transition-transform hover:scale-105">
                  <CategoryCard
                    category={subcategory}
                    icon={Icon}
                    questionCount={questionCount}
                    language={language}
                    isSelected={false}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                    className="h-full cursor-pointer"
                  />
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500">
              {language === 'zh' 
                ? '选择技术领域后，您将进入该领域的专门学习模式'
                : '技術領域を選択すると、その領域の専用学習モードに入ります'
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  // 主分类选择界面
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo 
                language={language} 
                onClick={onBack}
              />
              <div className="h-6 w-px bg-gray-200"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'zh' ? '返回主页' : 'ホームに戻る'}
              </Button>
            </div>
            <LanguageToggle language={language} onToggle={onToggleLanguage} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {content[language].subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {content[language].description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: Category) => {
            const Icon = categoryIconMap[category.id as keyof typeof categoryIconMap] || Code
            const questionCount = getQuestionCount(category.id)
            
            return (
              <div key={category.id} className="transform transition-transform hover:scale-105">
                <CategoryCard
                  category={category}
                  icon={Icon}
                  questionCount={questionCount}
                  language={language}
                  isSelected={false}
                  onClick={() => handleCategoryClick(category.id)}
                  className="h-full cursor-pointer"
                />
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            {language === 'zh' 
              ? '选择分类后，您将进入专门的学习模式，只显示该分类的问题'
              : 'カテゴリを選択すると、そのカテゴリの問題のみが表示される専用の学習モードに入ります'
            }
          </p>
        </div>
      </div>
    </div>
  )
} 