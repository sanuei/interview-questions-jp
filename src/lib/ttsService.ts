import { Language } from '@/types'

export interface TTSOptions {
  text: string
  language: Language
  rate?: number
  pitch?: number
  volume?: number
  voice?: string
  service?: 'browser' | 'openai' | 'azure' | 'google' | 'elevenlabs'
}

export interface TTSVoice {
  id: string
  name: string
  language: Language
  gender: 'male' | 'female'
  service: string
}

export class TTSService {
  private static instance: TTSService
  private speechSynthesis: SpeechSynthesis | null = null
  private isSupported: boolean = false

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis
      this.isSupported = true
    }
  }

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService()
    }
    return TTSService.instance
  }

  // 检查是否支持TTS
  checkSupport(): boolean {
    return this.isSupported
  }

  // 使用Web Speech API朗读
  async speak(options: TTSOptions): Promise<void> {
    const service = options.service || 'browser'
    
    switch (service) {
      case 'browser':
        return this.speakWithBrowser(options)
      case 'openai':
        return this.speakWithOpenAI(options)
      case 'azure':
        return this.speakWithAzure(options)
      case 'google':
        return this.speakWithGoogle(options)
      case 'elevenlabs':
        return this.speakWithElevenLabs(options)
      default:
        return this.speakWithBrowser(options)
    }
  }

  // 浏览器Web Speech API
  private async speakWithBrowser(options: TTSOptions): Promise<void> {
    if (!this.speechSynthesis || !this.isSupported) {
      throw new Error('Speech synthesis not supported')
    }

    // 停止当前朗读
    this.stop()

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(options.text)
      
      // 设置语言
      utterance.lang = options.language === 'zh' ? 'zh-CN' : 'ja-JP'
      
      // 设置语音参数
      utterance.rate = options.rate || 1.0
      utterance.pitch = options.pitch || 1.0
      utterance.volume = options.volume || 1.0

      // 事件监听
      utterance.onend = () => resolve()
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`))

      // 开始朗读
      this.speechSynthesis!.speak(utterance)
    })
  }

  // OpenAI TTS API
  private async speakWithOpenAI(options: TTSOptions): Promise<void> {
    try {
      const response = await fetch('/api/tts/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice: this.getOpenAIVoice(options.language),
          model: 'tts-1',
          response_format: 'mp3',
          speed: options.rate || 1.0
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI TTS API error: ${response.statusText}`)
      }

      const audioBlob = await response.blob()
      await this.playAudioBlob(audioBlob)
    } catch (error) {
      console.error('OpenAI TTS Error:', error)
      // 降级到浏览器API
      return this.speakWithBrowser(options)
    }
  }

  // Azure Cognitive Services TTS
  private async speakWithAzure(options: TTSOptions): Promise<void> {
    try {
      const response = await fetch('/api/tts/azure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice: this.getAzureVoice(options.language),
          rate: options.rate || 1.0,
          pitch: options.pitch || 1.0
        })
      })

      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.statusText}`)
      }

      const audioBlob = await response.blob()
      await this.playAudioBlob(audioBlob)
    } catch (error) {
      console.error('Azure TTS Error:', error)
      return this.speakWithBrowser(options)
    }
  }

  // Google Cloud Text-to-Speech
  private async speakWithGoogle(options: TTSOptions): Promise<void> {
    try {
      const response = await fetch('/api/tts/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice: this.getGoogleVoice(options.language),
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: options.rate || 1.0,
            pitch: options.pitch || 0.0,
            volumeGainDb: 0.0
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.statusText}`)
      }

      const audioBlob = await response.blob()
      await this.playAudioBlob(audioBlob)
    } catch (error) {
      console.error('Google TTS Error:', error)
      return this.speakWithBrowser(options)
    }
  }

  // ElevenLabs TTS
  private async speakWithElevenLabs(options: TTSOptions): Promise<void> {
    try {
      const response = await fetch('/api/tts/elevenlabs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          voice_id: this.getElevenLabsVoice(options.language),
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      })

      if (!response.ok) {
        throw new Error(`ElevenLabs TTS API error: ${response.statusText}`)
      }

      const audioBlob = await response.blob()
      await this.playAudioBlob(audioBlob)
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error)
      return this.speakWithBrowser(options)
    }
  }

  // 播放音频blob
  private async playAudioBlob(blob: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(URL.createObjectURL(blob))
      
      audio.onended = () => {
        URL.revokeObjectURL(audio.src)
        resolve()
      }
      
      audio.onerror = () => {
        URL.revokeObjectURL(audio.src)
        reject(new Error('Audio playback failed'))
      }
      
      audio.play().catch(reject)
    })
  }

  // 获取OpenAI语音
  private getOpenAIVoice(language: Language): string {
    return language === 'zh' ? 'alloy' : 'nova'
  }

  // 获取Azure语音
  private getAzureVoice(language: Language): string {
    return language === 'zh' 
      ? 'zh-CN-XiaoxiaoNeural' 
      : 'ja-JP-NanamiNeural'
  }

  // 获取Google语音
  private getGoogleVoice(language: Language): object {
    return language === 'zh' 
      ? { languageCode: 'zh-CN', name: 'zh-CN-Wavenet-A' }
      : { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-A' }
  }

  // 获取ElevenLabs语音
  private getElevenLabsVoice(language: Language): string {
    // 这些是示例ID，实际使用时需要替换为真实的voice_id
    return language === 'zh' 
      ? 'zh-voice-id-here' 
      : 'ja-voice-id-here'
  }

  // 获取推荐的TTS服务配置
  getRecommendedService(): TTSOptions['service'] {
    // 根据用户的偏好或环境返回推荐的服务
    if (typeof window !== 'undefined') {
      const preferred = localStorage.getItem('preferredTTSService')
      if (preferred) {
        return preferred as TTSOptions['service']
      }
    }
    
    // 默认使用浏览器API，如果需要高质量可以改为 'openai' 或 'azure'
    return 'browser'
  }

  // 设置首选TTS服务
  setPreferredService(service: TTSOptions['service']): void {
    if (typeof window !== 'undefined' && service) {
      localStorage.setItem('preferredTTSService', service)
    }
  }

  // 获取可用的语音列表
  async getAvailableVoices(service: TTSOptions['service'] = 'browser'): Promise<TTSVoice[]> {
    switch (service) {
      case 'browser':
        return this.getBrowserVoices()
      case 'openai':
        return this.getOpenAIVoices()
      case 'azure':
        return this.getAzureVoices()
      case 'google':
        return this.getGoogleVoices()
      case 'elevenlabs':
        return this.getElevenLabsVoices()
      default:
        return this.getBrowserVoices()
    }
  }

  private getBrowserVoices(): TTSVoice[] {
    if (!this.speechSynthesis) return []
    
    return this.speechSynthesis.getVoices()
      .filter(voice => voice.lang.startsWith('zh') || voice.lang.startsWith('ja'))
      .map(voice => ({
        id: voice.voiceURI,
        name: voice.name,
        language: voice.lang.startsWith('zh') ? 'zh' : 'ja',
        gender: voice.name.toLowerCase().includes('female') ? 'female' : 'male',
        service: 'browser'
      }))
  }

  private getOpenAIVoices(): TTSVoice[] {
    return [
      { id: 'alloy', name: 'Alloy', language: 'zh', gender: 'female', service: 'openai' },
      { id: 'echo', name: 'Echo', language: 'zh', gender: 'male', service: 'openai' },
      { id: 'nova', name: 'Nova', language: 'ja', gender: 'female', service: 'openai' },
      { id: 'shimmer', name: 'Shimmer', language: 'ja', gender: 'female', service: 'openai' }
    ]
  }

  private getAzureVoices(): TTSVoice[] {
    return [
      { id: 'zh-CN-XiaoxiaoNeural', name: 'Xiaoxiao', language: 'zh', gender: 'female', service: 'azure' },
      { id: 'zh-CN-YunyeNeural', name: 'Yunye', language: 'zh', gender: 'male', service: 'azure' },
      { id: 'ja-JP-NanamiNeural', name: 'Nanami', language: 'ja', gender: 'female', service: 'azure' },
      { id: 'ja-JP-KeitaNeural', name: 'Keita', language: 'ja', gender: 'male', service: 'azure' }
    ]
  }

  private getGoogleVoices(): TTSVoice[] {
    return [
      { id: 'zh-CN-Wavenet-A', name: 'Wavenet A', language: 'zh', gender: 'female', service: 'google' },
      { id: 'zh-CN-Wavenet-B', name: 'Wavenet B', language: 'zh', gender: 'male', service: 'google' },
      { id: 'ja-JP-Wavenet-A', name: 'Wavenet A', language: 'ja', gender: 'female', service: 'google' },
      { id: 'ja-JP-Wavenet-C', name: 'Wavenet C', language: 'ja', gender: 'male', service: 'google' }
    ]
  }

  private getElevenLabsVoices(): TTSVoice[] {
    return [
      { id: 'zh-voice-1', name: 'Chinese Female', language: 'zh', gender: 'female', service: 'elevenlabs' },
      { id: 'zh-voice-2', name: 'Chinese Male', language: 'zh', gender: 'male', service: 'elevenlabs' },
      { id: 'ja-voice-1', name: 'Japanese Female', language: 'ja', gender: 'female', service: 'elevenlabs' },
      { id: 'ja-voice-2', name: 'Japanese Male', language: 'ja', gender: 'male', service: 'elevenlabs' }
    ]
  }

  // 停止朗读
  stop(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel()
    }
  }

  // 暂停朗读
  pause(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.pause()
    }
  }

  // 恢复朗读
  resume(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.resume()
    }
  }

  // 检查是否正在朗读
  isSpeaking(): boolean {
    return this.speechSynthesis ? this.speechSynthesis.speaking : false
  }
}

// 导出单例实例
export const ttsService = TTSService.getInstance() 