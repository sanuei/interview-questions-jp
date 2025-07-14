'use client'

import { useState, useEffect, useRef } from 'react'
import { Language } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  Building2, 
  Code, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories } from '@/data/categories'
import { questions } from '@/data/questions'

interface CategorySwitcherProps {
  language: Language
  selectedCategory: string | null
  selectedSubcategory: string | null
  onCategoryChange: (categoryId: string, subcategoryId?: string) => void
  className?: string
}

export default function CategorySwitcher({
  language,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  className
}: CategorySwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
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

  // 获取所有可导航的分类和子分类
  const getAllNavigationItems = () => {
    const items: Array<{
      id: string
      name: { zh: string; ja: string }
      category: string
      subcategory?: string
      questionCount: number
    }> = []
    
    categories.forEach(category => {
      if (category.subcategories && category.subcategories.length > 0) {
        // 如果有子分类，添加每个子分类
        category.subcategories.forEach(subcategory => {
          const questionCount = questions.filter(q => 
            q.category === category.id && q.subcategory === subcategory.id
          ).length
          
          items.push({
            id: `${category.id}-${subcategory.id}`,
            name: subcategory.name,
            category: category.id,
            subcategory: subcategory.id,
            questionCount
          })
        })
      } else {
        // 如果没有子分类，添加主分类
        const questionCount = questions.filter(q => q.category === category.id).length
        items.push({
          id: category.id,
          name: category.name,
          category: category.id,
          questionCount
        })
      }
    })
    
    return items
  }

  const navigationItems = getAllNavigationItems()
  const currentNavigationIndex = navigationItems.findIndex(item => 
    item.category === selectedCategory && 
    (item.subcategory === selectedSubcategory || 
     (!item.subcategory && !selectedSubcategory))
  )

  const currentItem = currentNavigationIndex >= 0 ? navigationItems[currentNavigationIndex] : null
  const canGoPrev = currentNavigationIndex > 0
  const canGoNext = currentNavigationIndex >= 0 && currentNavigationIndex < navigationItems.length - 1

  const handlePrevCategory = () => {
    if (canGoPrev && currentNavigationIndex > 0) {
      const prevItem = navigationItems[currentNavigationIndex - 1]
      onCategoryChange(prevItem.category, prevItem.subcategory)
    }
  }

  const handleNextCategory = () => {
    if (canGoNext && currentNavigationIndex >= 0 && currentNavigationIndex < navigationItems.length - 1) {
      const nextItem = navigationItems[currentNavigationIndex + 1]
      onCategoryChange(nextItem.category, nextItem.subcategory)
    }
  }

  const handleCategorySelect = (item: typeof navigationItems[0]) => {
    onCategoryChange(item.category, item.subcategory)
    setIsExpanded(false)
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const content = {
    zh: {
      currentCategory: '当前分类',
      switchCategory: '切换分类',
      prevCategory: '上一分类',
      nextCategory: '下一分类',
      questions: '题'
    },
    ja: {
      currentCategory: '現在のカテゴリ',
      switchCategory: 'カテゴリ切り替え',
      prevCategory: '前のカテゴリ',
      nextCategory: '次のカテゴリ',
      questions: '問題'
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* 当前分类显示和快速切换按钮 */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* 上一分类按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevCategory}
          disabled={!canGoPrev}
          className="flex-shrink-0 px-2"
          title={content[language].prevCategory}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* 当前分类显示和下拉按钮 */}
        <div className="flex-1 min-w-0">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={!currentItem}
            className="w-full justify-between text-left h-auto py-2 px-2 sm:px-3"
          >
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              {currentItem ? (
                <>
                  {(() => {
                    const Icon = currentItem.subcategory 
                      ? subcategoryIconMap[currentItem.subcategory as keyof typeof subcategoryIconMap] || Code
                      : categoryIconMap[currentItem.category as keyof typeof categoryIconMap] || Code
                    return <Icon className="w-4 h-4 flex-shrink-0" />
                  })()}
                  <span className="truncate font-medium text-sm">
                    {currentItem.name[language]}
                  </span>
                  <Badge variant="secondary" className="ml-1 text-xs hidden sm:inline-flex">
                    {currentItem.questionCount}
                  </Badge>
                </>
              ) : (
                <span className="text-sm text-gray-500">
                  {language === 'zh' ? '选择分类' : 'カテゴリを選択'}
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            )}
          </Button>
        </div>

        {/* 下一分类按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextCategory}
          disabled={!canGoNext}
          className="flex-shrink-0 px-2"
          title={content[language].nextCategory}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* 分类选择下拉面板 */}
      {isExpanded && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border shadow-lg">
          <CardContent className="p-3">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 border-b">
                {content[language].switchCategory}
              </div>
              {navigationItems.map((item) => {
                const Icon = item.subcategory 
                  ? subcategoryIconMap[item.subcategory as keyof typeof subcategoryIconMap] || Code
                  : categoryIconMap[item.category as keyof typeof categoryIconMap] || Code
                
                const isSelected = item.category === selectedCategory && 
                  (item.subcategory === selectedSubcategory || 
                   (!item.subcategory && !selectedSubcategory))
                
                return (
                  <Button
                    key={item.id}
                    variant={isSelected ? "default" : "ghost"}
                    onClick={() => handleCategorySelect(item)}
                    className={cn(
                      "w-full justify-start text-left h-auto py-2 px-2",
                      isSelected && "bg-gray-900 text-white"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {item.name[language]}
                      </span>
                      <Badge 
                        variant={isSelected ? "outline" : "secondary"} 
                        className={cn(
                          "ml-auto text-xs",
                          isSelected && "border-gray-300 text-gray-300"
                        )}
                      >
                        {item.questionCount}
                      </Badge>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 