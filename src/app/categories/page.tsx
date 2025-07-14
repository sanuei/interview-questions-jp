'use client'

import { useLanguage } from '@/hooks/useLanguage'
import CategorySelectionPage from '@/components/CategorySelectionPage'
import { useRouter } from 'next/navigation'

export default function CategoriesPage() {
  const { language, toggleLanguage } = useLanguage()
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  const handleCategorySelect = (categoryId: string, subcategoryId?: string) => {
    if (subcategoryId) {
      router.push(`/study/${categoryId}/${subcategoryId}`)
    } else {
      router.push(`/study/${categoryId}`)
    }
  }

  return (
    <CategorySelectionPage
      language={language}
      onToggleLanguage={toggleLanguage}
      onBack={handleBack}
      onCategorySelect={handleCategorySelect}
    />
  )
} 