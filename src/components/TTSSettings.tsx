'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Play, Pause } from 'lucide-react'
import { ttsService, TTSOptions, TTSVoice } from '@/lib/ttsService'
import { Language } from '@/types'

interface TTSSettingsProps {
  language: Language
  onClose?: () => void
}

export function TTSSettings({ language, onClose }: TTSSettingsProps) {
  const [selectedService, setSelectedService] = useState<TTSOptions['service']>('browser')
  const [availableVoices, setAvailableVoices] = useState<TTSVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [rate, setRate] = useState(1.0)
  const [volume, setVolume] = useState(0.8)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 测试文本
  const testText = {
    zh: '这是一个测试文本，用来试听语音效果。',
    ja: 'これはテスト用のテキストで、音声効果を試聴するためのものです。'
  }

  const loadVoices = useCallback(async (service: TTSOptions['service']) => {
    try {
      setIsLoading(true)
      const voices = await ttsService.getAvailableVoices(service)
      const filteredVoices = voices.filter(voice => voice.language === language)
      setAvailableVoices(filteredVoices)
      
      // 选择第一个可用的语音
      if (filteredVoices.length > 0) {
        setSelectedVoice(filteredVoices[0].id)
      }
    } catch (error) {
      console.error('Failed to load voices:', error)
    } finally {
      setIsLoading(false)
    }
  }, [language])

  useEffect(() => {
    // 加载当前设置
    const currentService = ttsService.getRecommendedService()
    setSelectedService(currentService)
    loadVoices(currentService)
  }, [loadVoices])

  const handleServiceChange = (service: TTSOptions['service']) => {
    setSelectedService(service)
    ttsService.setPreferredService(service)
    loadVoices(service)
  }

  const handleTestSpeak = async () => {
    if (isPlaying) {
      ttsService.stop()
      setIsPlaying(false)
      return
    }

    try {
      setIsPlaying(true)
      await ttsService.speak({
        text: testText[language],
        language,
        service: selectedService,
        voice: selectedVoice,
        rate: rate,
        volume: volume
      })
      setIsPlaying(false)
    } catch (error) {
      console.error('Test speak error:', error)
      setIsPlaying(false)
    }
  }

  const serviceOptions = [
    { value: 'browser', label: '浏览器语音 (免费)', description: '使用浏览器内置语音合成' },
    { value: 'openai', label: 'OpenAI TTS (高质量)', description: '需要API密钥，音质优秀' },
    { value: 'azure', label: 'Azure TTS (高质量)', description: '需要API密钥，多种语音选择' },
    { value: 'google', label: 'Google TTS (高质量)', description: '需要API密钥，WaveNet技术' },
    { value: 'elevenlabs', label: 'ElevenLabs (顶级)', description: '需要API密钥，最自然的语音' }
  ]

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          {language === 'zh' ? '语音设置' : '音声設定'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 服务选择 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {language === 'zh' ? 'TTS 服务' : 'TTSサービス'}
          </label>
          <div className="space-y-2">
            {serviceOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={option.value}
                  name="tts-service"
                  value={option.value}
                  checked={selectedService === option.value}
                  onChange={() => handleServiceChange(option.value as TTSOptions['service'])}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 语音选择 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {language === 'zh' ? '语音' : '音声'}
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            disabled={isLoading}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label={language === 'zh' ? '选择语音' : '音声を選択'}
          >
            <option value="">
              {language === 'zh' ? '选择语音' : '音声を選択'}
            </option>
            {availableVoices.map(voice => (
              <option key={voice.id} value={voice.id}>
                {voice.name} ({voice.gender === 'female' ? '女' : '男'})
              </option>
            ))}
          </select>
        </div>

        {/* 语速设置 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {language === 'zh' ? '语速' : '話速'}: {rate}x
          </label>
                     <input
             type="range"
             min="0.5"
             max="2.0"
             step="0.1"
             value={rate}
             onChange={(e) => setRate(parseFloat(e.target.value))}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             aria-label={language === 'zh' ? '语速' : '話速'}
           />
        </div>

        {/* 音量设置 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {language === 'zh' ? '音量' : '音量'}: {Math.round(volume * 100)}%
          </label>
                     <input
             type="range"
             min="0.1"
             max="1.0"
             step="0.1"
             value={volume}
             onChange={(e) => setVolume(parseFloat(e.target.value))}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             aria-label={language === 'zh' ? '音量' : '音量'}
           />
        </div>

        {/* 测试按钮 */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleTestSpeak}
            disabled={isLoading || !selectedVoice}
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                {language === 'zh' ? '停止' : '停止'}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {language === 'zh' ? '测试语音' : '音声テスト'}
              </>
            )}
          </Button>
          
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              {language === 'zh' ? '关闭' : '閉じる'}
            </Button>
          )}
        </div>

        {/* API密钥提示 */}
        {selectedService !== 'browser' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              {language === 'zh' ? (
                <>
                  <strong>注意：</strong> 此服务需要API密钥。请在环境变量中设置相应的API密钥。
                  <br />
                  例如：OPENAI_API_KEY, AZURE_SPEECH_KEY, GOOGLE_APPLICATION_CREDENTIALS 等。
                </>
              ) : (
                <>
                  <strong>注意：</strong> このサービスにはAPIキーが必要です。環境変数で対応するAPIキーを設定してください。
                  <br />
                  例：OPENAI_API_KEY、AZURE_SPEECH_KEY、GOOGLE_APPLICATION_CREDENTIALS など。
                </>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 