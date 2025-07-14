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
          zh: 'Java核心概念、Spring框架、JVM调优等',
          ja: 'Javaコア概念、Springフレームワーク、JVMチューニングなど'
        },
        icon: 'Coffee',
        color: 'bg-orange-500'
      },
      {
        id: 'frontend',
        name: {
          zh: '前端开发',
          ja: 'フロントエンド開発'
        },
        description: {
          zh: 'React、Vue、JavaScript、CSS、HTML等前端技术',
          ja: 'React、Vue、JavaScript、CSS、HTMLなどフロントエンド技術'
        },
        icon: 'Monitor',
        color: 'bg-cyan-500'
      },
      {
        id: 'backend',
        name: {
          zh: '后端开发',
          ja: 'バックエンド開発'
        },
        description: {
          zh: 'Node.js、Python、API设计、微服务架构',
          ja: 'Node.js、Python、API設計、マイクロサービスアーキテクチャ'
        },
        icon: 'Server',
        color: 'bg-indigo-500'
      },
      {
        id: 'database',
        name: {
          zh: '数据库技术',
          ja: 'データベース技術'
        },
        description: {
          zh: 'SQL、NoSQL、数据库设计、性能优化',
          ja: 'SQL、NoSQL、データベース設計、パフォーマンス最適化'
        },
        icon: 'Database',
        color: 'bg-purple-500'
      },
      {
        id: 'cloud',
        name: {
          zh: '云计算技术',
          ja: 'クラウドコンピューティング技術'
        },
        description: {
          zh: 'AWS、Azure、GCP、Kubernetes、Docker',
          ja: 'AWS、Azure、GCP、Kubernetes、Docker'
        },
        icon: 'Cloud',
        color: 'bg-yellow-500'
      },
      {
        id: 'system-design',
        name: {
          zh: '系统设计',
          ja: 'システム設計'
        },
        description: {
          zh: '架构设计、负载均衡、分布式系统、扩展性',
          ja: 'アーキテクチャ設計、ロードバランシング、分散システム、スケーラビリティ'
        },
        icon: 'Network',
        color: 'bg-red-500'
      },
      {
        id: 'devops',
        name: {
          zh: 'DevOps运维',
          ja: 'DevOps運用'
        },
        description: {
          zh: 'CI/CD、自动化部署、监控、版本控制',
          ja: 'CI/CD、自動化デプロイ、監視、バージョン管理'
        },
        icon: 'Settings',
        color: 'bg-green-600'
      },
      {
        id: 'security',
        name: {
          zh: '网络安全',
          ja: 'ネットワークセキュリティ'
        },
        description: {
          zh: '安全漏洞、加密技术、身份认证、安全架构',
          ja: 'セキュリティ脆弱性、暗号化技術、認証、セキュリティアーキテクチャ'
        },
        icon: 'Shield',
        color: 'bg-rose-500'
      },
      {
        id: 'algorithms',
        name: {
          zh: '算法数据结构',
          ja: 'アルゴリズム・データ構造'
        },
        description: {
          zh: '排序算法、数据结构、复杂度分析、编程题',
          ja: 'ソートアルゴリズム、データ構造、計算量解析、プログラミング問題'
        },
        icon: 'Brain',
        color: 'bg-violet-500'
      },
      {
        id: 'react',
        name: {
          zh: 'React技术',
          ja: 'React技術'
        },
        description: {
          zh: 'React框架、Hooks、组件设计、状态管理',
          ja: 'Reactフレームワーク、Hooks、コンポーネント設計、状態管理'
        },
        icon: 'Atom',
        color: 'bg-cyan-600'
      },
      {
        id: 'aws',
        name: {
          zh: 'AWS云服务',
          ja: 'AWSクラウドサービス'
        },
        description: {
          zh: 'AWS核心服务、云架构、部署运维',
          ja: 'AWSコアサービス、クラウドアーキテクチャ、デプロイ運用'
        },
        icon: 'Cloud',
        color: 'bg-orange-600'
      },
      {
        id: 'scripting',
        name: {
          zh: '脚本语言',
          ja: 'スクリプト言語'
        },
        description: {
          zh: 'Shell、Python、PowerShell、自动化脚本',
          ja: 'Shell、Python、PowerShell、自動化スクリプト'
        },
        icon: 'Terminal',
        color: 'bg-emerald-600'
      }
    ]
  }
] 