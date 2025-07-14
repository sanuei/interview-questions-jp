import { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'general',
    name: {
      zh: '通用面试问题',
      ja: '一般的な面接質問'
    },
    description: {
      zh: '适用于所有IT职位的通用面试问题',
      ja: 'すべてのITポジションに適用される一般的な面接質問'
    },
    icon: 'User',
    color: 'bg-blue-500',
    subcategories: [
      {
        id: 'self-intro',
        name: {
          zh: '自我介绍',
          ja: '自己紹介'
        },
        description: {
          zh: '如何进行有效的自我介绍',
          ja: '効果的な自己紹介の方法'
        },
        icon: 'UserCircle',
        color: 'bg-blue-400'
      },
      {
        id: 'strengths-weaknesses',
        name: {
          zh: '优缺点分析',
          ja: '長所・短所の分析'
        },
        description: {
          zh: '如何回答优点和缺点问题',
          ja: '長所と短所の質問への回答方法'
        },
        icon: 'Scale',
        color: 'bg-blue-600'
      },
      {
        id: 'career-goals',
        name: {
          zh: '职业规划',
          ja: 'キャリアプラン'
        },
        description: {
          zh: '职业发展规划相关问题',
          ja: 'キャリア開発に関する質問'
        },
        icon: 'Target',
        color: 'bg-blue-700'
      }
    ]
  },
  {
    id: 'japan-specific',
    name: {
      zh: '日本企业特色',
      ja: '日本企業特有'
    },
    description: {
      zh: '针对日本IT企业的特色面试问题',
      ja: '日本のIT企業に特化した面接質問'
    },
    icon: 'Building2',
    color: 'bg-red-500'
  },
  {
    id: 'technical',
    name: {
      zh: '技术面试',
      ja: '技術面接'
    },
    description: {
      zh: 'IT技术相关的面试问题',
      ja: 'IT技術に関する面接質問'
    },
    icon: 'Code',
    color: 'bg-green-500',
    subcategories: [
      {
        id: 'java',
        name: {
          zh: 'Java开发',
          ja: 'Java開発'
        },
        description: {
          zh: 'Java编程语言相关问题',
          ja: 'Javaプログラミング言語に関する質問'
        },
        icon: 'Coffee',
        color: 'bg-orange-500'
      },
      {
        id: 'react',
        name: {
          zh: 'React前端',
          ja: 'Reactフロントエンド'
        },
        description: {
          zh: 'React框架开发相关问题',
          ja: 'Reactフレームワーク開発に関する質問'
        },
        icon: 'Atom',
        color: 'bg-cyan-500'
      },
      {
        id: 'aws',
        name: {
          zh: 'AWS云服务',
          ja: 'AWSクラウドサービス'
        },
        description: {
          zh: 'Amazon Web Services相关问题',
          ja: 'Amazon Web Servicesに関する質問'
        },
        icon: 'Cloud',
        color: 'bg-yellow-500'
      },
      {
        id: 'docker',
        name: {
          zh: 'Docker容器',
          ja: 'Dockerコンテナ'
        },
        description: {
          zh: 'Docker容器化技术问题',
          ja: 'Dockerコンテナ化技術の質問'
        },
        icon: 'Box',
        color: 'bg-blue-500'
      },
      {
        id: 'sql',
        name: {
          zh: 'SQL数据库',
          ja: 'SQLデータベース'
        },
        description: {
          zh: 'SQL数据库相关问题',
          ja: 'SQLデータベースに関する質問'
        },
        icon: 'Database',
        color: 'bg-purple-500'
      }
    ]
  }
] 