'use client'

import { Question, Language } from '@/types'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Search, List } from 'lucide-react'
import { useState } from 'react'

interface QuestionSidebarProps {
  questions: Question[]
  currentQuestionId: string | null
  onQuestionSelect: (questionId: string) => void
  onShowAllQuestions: () => void
  language: Language
}

export default function QuestionSidebar({
  questions,
  currentQuestionId,
  onQuestionSelect,
  onShowAllQuestions,
  language
}: QuestionSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800' 
      case 'hard': return 'bg-red-100 text-red-800'
    }
  }

  const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (language === 'zh') {
      switch (difficulty) {
        case 'easy': return '简单'
        case 'medium': return '中等'
        case 'hard': return '困难'
      }
    } else {
      switch (difficulty) {
        case 'easy': return '簡単'
        case 'medium': return '普通'
        case 'hard': return '困難'
      }
    }
  }

  const filteredQuestions = questions.filter(question =>
    question.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'zh' ? '问题导航' : '質問ナビ'}
          </h2>
          <button
            onClick={onShowAllQuestions}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={language === 'zh' ? '查看所有问题' : 'すべての質問を表示'}
          >
            <List className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'zh' ? '搜索问题...' : '質問を検索...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {language === 'zh' 
            ? `显示 ${filteredQuestions.length} / ${questions.length} 个问题`
            : `${filteredQuestions.length} / ${questions.length} 問題を表示`
          }
        </p>
      </div>
      
      {/* Question List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              onClick={() => onQuestionSelect(question.id)}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm group",
                currentQuestionId === question.id
                  ? "bg-gray-50 border-gray-300 shadow-sm"
                  : "bg-white border-gray-200 hover:border-gray-300"
              )}
            >
              {/* Question Number & Difficulty */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  #{String(questions.indexOf(question) + 1).padStart(2, '0')}
                </span>
                <Badge 
                  className={cn(
                    "text-xs px-2 py-0.5",
                    getDifficultyColor(question.difficulty)
                  )}
                >
                  {getDifficultyText(question.difficulty)}
                </Badge>
              </div>
              
              {/* Question Title */}
              <h3 className="text-sm font-medium text-gray-900 mb-2 leading-tight group-hover:text-gray-700 transition-colors" 
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                {question.question[language]}
              </h3>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {question.tags.slice(0, 2).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {question.tags.length > 2 && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5"
                  >
                    +{question.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredQuestions.length === 0 && (
          <div className="p-8 text-center">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              {language === 'zh' ? '没有找到匹配的问题' : '一致する質問が見つかりませんでした'}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
} 