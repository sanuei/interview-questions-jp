'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/types'

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('zh')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'ja')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'zh' ? 'ja' : 'zh'
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }

  return {
    language,
    setLanguage,
    toggleLanguage,
    isZh: language === 'zh',
    isJa: language === 'ja'
  }
} 