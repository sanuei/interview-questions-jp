'use client'

import { Language } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Globe, Star, Target, Users, Zap, ChevronRight } from 'lucide-react'

interface HomePageProps {
  language: Language
  onStartStudy: () => void
  onViewAllQuestions: () => void
}

export default function HomePage({ language, onStartStudy, onViewAllQuestions }: HomePageProps) {
  const content = {
    hero: {
      zh: {
        title: '掌握IT面试，从InterviewAce开始',
        subtitle: '专为日本IT市场设计的智能面试准备平台',
        description: '精选面试题库 + 中日双语支持 + 智能评分系统，助您在竞争激烈的IT面试中脱颖而出',
        startButton: '开始学习',
        exploreButton: '全部问题'
      },
      ja: {
        title: 'IT面接をマスターし、InterviewAceから始めよう',
        subtitle: '日本のITマーケット向けに設計されたスマート面接準備プラットフォーム',
        description: '厳選された面接問題集 + 中日バイリンガルサポート + インテリジェント評価システムで、競争の激しいIT面接での成功をサポートします',
        startButton: '学習を始める',
        exploreButton: 'すべての質問'
      }
    },
    features: {
      zh: [
        {
          icon: BookOpen,
          title: '精选题库',
          description: '涵盖通用面试、日本企业特色、技术专业等三大类别，18+精心整理的面试问题'
        },
        {
          icon: Globe,
          title: '双语支持',
          description: '中日文无缝切换，帮助您在日本求职市场中更好地准备和表达'
        },
        {
          icon: Star,
          title: '智能评分',
          description: '为每个问题进行评分，追踪学习进度，识别需要重点练习的领域'
        },
        {
          icon: Target,
          title: '分类练习',
          description: '按技术领域细分，包括Java、前端、后端、数据库、云计算等9个专业方向'
        },
        {
          icon: Zap,
          title: '高效学习',
          description: '单问题专注模式 + 问题列表浏览，灵活的学习方式适应不同需求'
        },
        {
          icon: Users,
          title: '日本专项',
          description: '深度解析日本企业文化和面试特点，针对性的问题和建议'
        }
      ],
      ja: [
        {
          icon: BookOpen,
          title: '厳選問題集',
          description: '一般面接、日本企業特有、技術専門の3つのカテゴリーをカバーし、18+の厳選面接問題'
        },
        {
          icon: Globe,
          title: 'バイリンガル対応',
          description: '中日文のシームレスな切り替えで、日本の求職市場でより良い準備と表現をサポート'
        },
        {
          icon: Star,
          title: 'インテリジェント評価',
          description: '各問題に評価を付け、学習進捗を追跡し、重点的に練習が必要な領域を特定'
        },
        {
          icon: Target,
          title: 'カテゴリー別練習',
          description: 'Java、フロントエンド、バックエンド、データベース、クラウドコンピューティングなど9つの専門分野別'
        },
        {
          icon: Zap,
          title: '効率的学習',
          description: '単一問題集中モード + 問題リスト閲覧、柔軟な学習方式で異なるニーズに対応'
        },
        {
          icon: Users,
          title: '日本特化',
          description: '日本企業文化と面接特徴の深層解析、ターゲットを絞った問題とアドバイス'
        }
      ]
    },
    stats: {
      zh: {
        title: '数据一览',
        items: [
          { number: '18+', label: '精选问题' },
          { number: '3', label: '主要类别' },
          { number: '9', label: '技术领域' },
          { number: '2', label: '语言支持' }
        ]
      },
      ja: {
        title: 'データ概要',
        items: [
          { number: '18+', label: '厳選問題' },
          { number: '3', label: 'メインカテゴリー' },
          { number: '9', label: '技術領域' },
          { number: '2', label: '言語サポート' }
        ]
      }
    },
    cta: {
      zh: {
        title: '准备好开始您的面试准备之旅了吗？',
        description: '加入数千名成功求职者的行列，让InterviewAce成为您IT职业发展的得力助手',
        button: '立即开始'
      },
      ja: {
        title: '面接準備の旅を始める準備はできていますか？',
        description: '数千人の成功した求職者の仲間入りをし、InterviewAceをあなたのITキャリア発展の強力な味方にしましょう',
        button: '今すぐ始める'
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge className="mb-6 text-sm px-6 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-gray-700">
              {language === 'zh' ? '🚀 全新IT面试准备平台' : '🚀 新しいIT面接準備プラットフォーム'}
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {content.hero[language].title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium max-w-4xl mx-auto">
            {content.hero[language].subtitle}
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
            {content.hero[language].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              onClick={onStartStudy}
              className="px-10 py-4 text-lg bg-gray-900 hover:bg-gray-800 text-white group shadow-lg hover:shadow-xl transition-all"
            >
              {content.hero[language].startButton}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onViewAllQuestions}
              className="px-10 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              {content.hero[language].exploreButton}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            {content.stats[language].title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats[language].items.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20">
            {language === 'zh' ? '为什么选择InterviewAce？' : 'なぜInterviewAceを選ぶのか？'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features[language].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:border-gray-300">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                    <feature.icon className="w-7 h-7 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {content.cta[language].title}
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {content.cta[language].description}
          </p>
          <Button 
            size="lg" 
            onClick={onStartStudy}
            className="px-12 py-4 text-lg bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {content.cta[language].button}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-500 text-lg">
            {language === 'zh' 
              ? '© 2024 InterviewAce. 专业的IT面试准备平台，助力您的职业发展。'
              : '© 2024 InterviewAce. プロフェッショナルなIT面接準備プラットフォーム、あなたのキャリア発展をサポートします。'
            }
          </p>
        </div>
      </footer>
    </div>
  )
} 