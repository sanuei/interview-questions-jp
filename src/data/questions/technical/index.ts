import { Question } from '@/types'
import { javaQuestions } from './java'
import { frontendQuestions } from './frontend'

// 后端开发问题（简化版本，可以后续扩展）
export const backendQuestions: Question[] = [
  {
    id: 'tech-backend-1',
    category: 'technical',
    subcategory: 'backend',
    question: {
      zh: '什么是RESTful API？请解释其设计原则',
      ja: 'RESTful APIとは何ですか？その設計原則を説明してください'
    },
    answer: {
      zh: 'RESTful API是基于REST架构风格的Web API。设计原则包括：1. 无状态 - 每个请求都包含处理所需的全部信息；2. 统一接口 - 使用标准HTTP方法(GET、POST、PUT、DELETE)；3. 资源标识 - 通过URI唯一标识资源；4. 资源表现 - 支持多种数据格式(JSON、XML)；5. 分层系统 - 客户端不需要知道是否连接到最终服务器；6. 可缓存 - 响应应该被标记为可缓存或不可缓存。',
      ja: 'RESTful APIはRESTアーキテクチャスタイルに基づくWeb APIです。設計原則には以下があります：1. ステートレス - 各リクエストに処理に必要な全情報を含む；2. 統一インターフェース - 標準HTTPメソッド（GET、POST、PUT、DELETE）を使用；3. リソース識別 - URIでリソースを一意に識別；4. リソース表現 - 複数のデータ形式（JSON、XML）をサポート；5. 階層システム - クライアントは最終サーバーに接続しているかを知る必要がない；6. キャッシュ可能 - レスポンスはキャッシュ可能または不可能としてマークされるべき。'
    },
    tags: ['REST', 'API設計', 'HTTP'],
    difficulty: 'medium'
  }
]

// 数据库问题（简化版本）
export const databaseQuestions: Question[] = [
  {
    id: 'tech-database-1',
    category: 'technical',
    subcategory: 'database',
    question: {
      zh: '请解释数据库事务的ACID特性',
      ja: 'データベーストランザクションのACID特性を説明してください'
    },
    answer: {
      zh: 'ACID是数据库事务的四个基本特性：1. 原子性(Atomicity) - 事务中的所有操作要么全部成功，要么全部失败回滚；2. 一致性(Consistency) - 事务执行前后数据库都处于一致状态；3. 隔离性(Isolation) - 并发执行的事务之间相互隔离，不会相互干扰；4. 持久性(Durability) - 事务一旦提交，其结果就永久保存在数据库中，即使系统故障也不会丢失。',
      ja: 'ACIDはデータベーストランザクションの4つの基本特性です：1. 原子性（Atomicity） - トランザクション内の全操作が成功するか、全て失敗してロールバック；2. 一貫性（Consistency） - トランザクション実行前後でデータベースが一貫した状態を保つ；3. 独立性（Isolation） - 並行実行されるトランザクション間が相互に隔離され、干渉しない；4. 永続性（Durability） - トランザクションが一度コミットされると、その結果はデータベースに永続的に保存され、システム障害でも失われない。'
    },
    tags: ['データベース', 'ACID', 'トランザクション'],
    difficulty: 'medium'
  }
]

// 云计算问题（简化版本）
export const cloudQuestions: Question[] = [
  {
    id: 'tech-cloud-1',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是容器化？Docker相比虚拟机有什么优势？',
      ja: 'コンテナ化とは何ですか？Dockerは仮想マシンと比べてどんな利点がありますか？'
    },
    answer: {
      zh: '容器化是将应用程序及其依赖打包在轻量级、可移植的容器中的技术。Docker相比虚拟机的优势：1. 资源利用率高 - 共享主机OS内核，开销更小；2. 启动速度快 - 秒级启动，而VM需要分钟级；3. 可移植性强 - "一次构建，到处运行"；4. 部署简单 - 标准化的部署流程；5. 版本控制 - 支持镜像版本管理；6. 微服务友好 - 适合微服务架构部署。',
      ja: 'コンテナ化は、アプリケーションとその依存関係を軽量で移植可能なコンテナにパッケージ化する技術です。Dockerが仮想マシンと比べた利点：1. 高いリソース利用率 - ホストOSカーネルを共有し、オーバーヘッドが小さい；2. 高速起動 - 秒単位での起動、VMは分単位が必要；3. 高い移植性 - "一度ビルドすればどこでも実行"；4. 簡単なデプロイ - 標準化されたデプロイプロセス；5. バージョン管理 - イメージのバージョン管理をサポート；6. マイクロサービスフレンドリー - マイクロサービスアーキテクチャのデプロイに適している。'
    },
    tags: ['Docker', 'コンテナ', 'クラウド'],
    difficulty: 'medium'
  }
]

// 系统设计问题（简化版本）
export const systemDesignQuestions: Question[] = [
  {
    id: 'tech-system-1',
    category: 'technical',
    subcategory: 'system-design',
    question: {
      zh: '如何设计一个高可用的Web系统？',
      ja: '高可用性のWebシステムをどのように設計しますか？'
    },
    answer: {
      zh: '设计高可用Web系统需要考虑：1. 负载均衡 - 使用LB分散请求，避免单点故障；2. 数据库集群 - 主从复制、读写分离、分库分表；3. 缓存策略 - Redis集群、CDN加速；4. 服务监控 - 实时监控、告警机制；5. 故障转移 - 自动failover机制；6. 容灾备份 - 多地域部署、数据备份；7. 限流熔断 - 保护系统免受突发流量冲击；8. 微服务架构 - 服务解耦，提高系统弹性。',
      ja: '高可用性Webシステムの設計では以下を考慮します：1. ロードバランシング - LBでリクエストを分散し、単一障害点を回避；2. データベースクラスタ - マスタースレーブレプリケーション、読み書き分離、シャーディング；3. キャッシュ戦略 - Redisクラスタ、CDN高速化；4. サービス監視 - リアルタイム監視、アラート機構；5. フェイルオーバー - 自動failover機構；6. 災害復旧 - マルチリージョンデプロイ、データバックアップ；7. レート制限・サーキットブレーカー - 突発的なトラフィックからシステムを保護；8. マイクロサービスアーキテクチャ - サービス分離でシステムの弾力性を向上。'
    },
    tags: ['システム設計', '高可用性', 'アーキテクチャ'],
    difficulty: 'hard'
  }
]

// 其他技术分类的问题（可以继续扩展）
export const devopsQuestions: Question[] = []
export const securityQuestions: Question[] = []
export const algorithmsQuestions: Question[] = []

// 聚合所有技术问题
export const technicalQuestions: Question[] = [
  ...javaQuestions,
  ...frontendQuestions,
  ...backendQuestions,
  ...databaseQuestions,
  ...cloudQuestions,
  ...systemDesignQuestions,
  ...devopsQuestions,
  ...securityQuestions,
  ...algorithmsQuestions
] 