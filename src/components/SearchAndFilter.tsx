'use client'

import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Language } from '@/types'
import { cn } from '@/lib/utils'

interface SearchAndFilterProps {
  language: Language
  sortBy: 'rating' | 'newest' | 'difficulty'
  onSortChange: (sort: 'rating' | 'newest' | 'difficulty') => void
  className?: string
}

export function SearchAndFilter({
  language,
  sortBy,
  onSortChange,
  className
}: SearchAndFilterProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border", className)}>
      <div className="flex items-center gap-2 flex-1">
        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          {language === 'zh' ? '排序方式：' : 'ソート：'}
        </span>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange('rating')}
            className="text-xs sm:text-sm"
          >
            {language === 'zh' ? '评分' : '評価'}
          </Button>
          <Button
            variant={sortBy === 'difficulty' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange('difficulty')}
            className="text-xs sm:text-sm"
          >
            {language === 'zh' ? '难度' : '難易度'}
          </Button>
          <Button
            variant={sortBy === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange('newest')}
            className="text-xs sm:text-sm"
          >
            {language === 'zh' ? '最新' : '最新'}
          </Button>
        </div>
      </div>
    </div>
  )
} 