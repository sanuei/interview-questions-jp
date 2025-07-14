'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Category, Language } from '@/types'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  category: Category | 'all'
  icon: LucideIcon
  questionCount: number
  language: Language
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function CategoryCard({
  category,
  icon: Icon,
  questionCount,
  language,
  isSelected,
  onClick,
  className
}: CategoryCardProps) {
  const getTitle = () => {
    if (category === 'all') {
      return language === 'zh' ? '全部问题' : 'すべての質問'
    }
    return category.name[language]
  }

  const getColor = () => {
    if (category === 'all') {
      return 'bg-gray-500'
    }
    return category.color
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 group",
        isSelected && "ring-2 ring-gray-400 shadow-lg",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="text-center">
        <div className={cn(
          "mx-auto p-3 rounded-full w-fit mb-3 transition-transform group-hover:scale-110",
          getColor()
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg group-hover:text-gray-700 transition-colors">
          {getTitle()}
        </CardTitle>
        <CardDescription>
          {language === 'zh' 
            ? `${questionCount} 个问题` 
            : `${questionCount} 件の質問`
          }
        </CardDescription>
      </CardHeader>
    </Card>
  )
} 