'use client'

import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Language } from '@/types'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  language: Language
  onToggle: () => void
  className?: string
}

export function LanguageToggle({ language, onToggle, className }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={cn("flex items-center gap-2", className)}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'zh' ? '中文' : '日本語'}
      </span>
      <span className="text-xs text-muted-foreground">
        {language === 'zh' ? '→ 日本語' : '→ 中文'}
      </span>
    </Button>
  )
} 