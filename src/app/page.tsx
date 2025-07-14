'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import HomePageComponent from '@/components/HomePage'
import { Logo } from '@/components/Logo'
import { LanguageToggle } from '@/components/LanguageToggle'
import { TTSSettings } from '@/components/TTSSettings'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { language, toggleLanguage } = useLanguage()
  const router = useRouter()
  const [showTTSSettings, setShowTTSSettings] = useState(false)

  const handleStartStudy = () => {
    router.push('/categories')
  }

  const handleViewAllQuestions = () => {
    router.push('/questions')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Logo 
              language={language} 
              onClick={() => router.push('/')}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTTSSettings(true)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {language === 'zh' ? '语音设置' : '音声設定'}
              </Button>
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </div>
      </header>
      
      <HomePageComponent 
        language={language}
        onStartStudy={handleStartStudy}
        onViewAllQuestions={handleViewAllQuestions}
      />

      {/* TTS Settings Modal */}
      {showTTSSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <TTSSettings 
              language={language} 
              onClose={() => setShowTTSSettings(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
