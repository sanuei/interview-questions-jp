import { Question } from '@/types'

export const awsQuestions: Question[] = [
  {
    id: 'aws-1',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS？AWS的核心服务有哪些？',
      ja: 'AWSとは何ですか？AWSの核心サービスは何ですか？'
    },
    answer: {
      zh: 'AWS（Amazon Web Services）是亚马逊提供的云计算平台，提供200多种服务。核心服务：1）EC2（Elastic Compute Cloud），虚拟服务器；2）S3（Simple Storage Service），对象存储；3）RDS（Relational Database Service），关系型数据库；4）Lambda，无服务器计算；5）VPC（Virtual Private Cloud），虚拟私有云；6）IAM（Identity and Access Management），身份和访问管理；7）CloudFront，内容分发网络；8）ELB（Elastic Load Balancing），负载均衡。AWS的好处：按需付费、全球部署、高可用性、丰富的服务生态。',
      ja: 'AWS（Amazon Web Services）は、Amazonが提供するクラウドコンピューティングプラットフォームで、200以上のサービスを提供しています。核心サービス：1）EC2（Elastic Compute Cloud）、仮想サーバー；2）S3（Simple Storage Service）、オブジェクトストレージ；3）RDS（Relational Database Service）、リレーショナルデータベース；4）Lambda、サーバーレスコンピューティング；5）VPC（Virtual Private Cloud）、仮想プライベートクラウド；6）IAM（Identity and Access Management）、アイデンティティとアクセス管理；7）CloudFront、コンテンツ配信ネットワーク；8）ELB（Elastic Load Balancing）、ロードバランシング。AWSの利点：従量課金、グローバル展開、高可用性、豊富なサービスエコシステム。'
    },
    tags: ['AWS', 'EC2', 'S3', 'Lambda', '云计算'],
    difficulty: 'medium'
  },
  {
    id: 'aws-2',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS EC2？如何选择合适的实例类型？',
      ja: 'AWS EC2とは何ですか？適切なインスタンスタイプをどのように選択しますか？'
    },
    answer: {
      zh: 'AWS EC2是弹性计算云服务，提供可扩展的虚拟服务器。实例类型选择：1）通用型（T系列），适合Web服务器、小型数据库；2）计算优化型（C系列），适合高性能计算、科学计算；3）内存优化型（R系列），适合内存数据库、大数据分析；4）存储优化型（I系列），适合NoSQL数据库、数据仓库；5）GPU实例（P系列），适合机器学习、图形渲染。选择考虑因素：CPU需求、内存需求、网络性能、存储需求、成本预算。定价模式：按需实例、预留实例、竞价实例。',
      ja: 'AWS EC2は弾性コンピューティングクラウドサービスで、スケーラブルな仮想サーバーを提供します。インスタンスタイプの選択：1）汎用型（Tシリーズ）、Webサーバー、小規模データベースに適している；2）コンピューティング最適化型（Cシリーズ）、高性能コンピューティング、科学計算に適している；3）メモリ最適化型（Rシリーズ）、メモリデータベース、ビッグデータ分析に適している；4）ストレージ最適化型（Iシリーズ）、NoSQLデータベース、データウェアハウスに適している；5）GPUインスタンス（Pシリーズ）、機械学習、グラフィックスレンダリングに適している。選択考慮要因：CPU要求、メモリ要求、ネットワーク性能、ストレージ要求、コスト予算。価格モデル：オンデマンドインスタンス、リザーブドインスタンス、スポットインスタンス。'
    },
    tags: ['EC2', '实例类型', '计算资源', '虚拟服务器'],
    difficulty: 'medium'
  },
  {
    id: 'aws-3',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS S3？S3的存储类别有哪些？',
      ja: 'AWS S3とは何ですか？S3のストレージクラスは何ですか？'
    },
    answer: {
      zh: 'AWS S3是简单存储服务，提供对象存储。存储类别：1）Standard，标准存储，高频访问，价格较高；2）Standard-IA，标准不频繁访问，价格较低但有检索费用；3）One Zone-IA，单区域不频繁访问，价格更低但可用性较低；4）Glacier，归档存储，检索时间几分钟到几小时；5）Glacier Deep Archive，深度归档，检索时间12小时，价格最低；6）Intelligent-Tiering，智能分层，自动在不同类别间移动数据。S3特性：99.999999999%的持久性、版本控制、跨区域复制、生命周期管理。',
      ja: 'AWS S3はシンプルストレージサービスで、オブジェクトストレージを提供します。ストレージクラス：1）Standard、標準ストレージ、高頻度アクセス、価格が高い；2）Standard-IA、標準低頻度アクセス、価格が低いが検索費用がある；3）One Zone-IA、単一ゾーン低頻度アクセス、価格がより低いが可用性が劣る；4）Glacier、アーカイブストレージ、検索時間数分から数時間；5）Glacier Deep Archive、深度アーカイブ、検索時間12時間、価格が最も低い；6）Intelligent-Tiering、インテリジェント階層化、異なるクラス間でデータを自動移動。S3特性：99.999999999%の耐久性、バージョン管理、クロスリージョンレプリケーション、ライフサイクル管理。'
    },
    tags: ['S3', '对象存储', '存储类别', '数据持久性'],
    difficulty: 'medium'
  },
  {
    id: 'aws-4',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS Lambda？Lambda的优缺点是什么？',
      ja: 'AWS Lambdaとは何ですか？Lambdaの利点と欠点は何ですか？'
    },
    answer: {
      zh: 'AWS Lambda是无服务器计算服务，运行代码无需管理服务器。优点：1）无服务器管理，AWS负责基础设施；2）自动扩缩容，根据请求量自动调整；3）按使用量付费，只为实际执行时间付费；4）高可用性，自动处理故障；5）支持多种编程语言；6）与其他AWS服务集成良好。缺点：1）冷启动延迟，首次执行较慢；2）执行时间限制，最长15分钟；3）内存限制，最大10GB；4）调试困难，本地测试复杂；5）厂商锁定。适用场景：API网关、数据处理、定时任务、事件驱动应用。',
      ja: 'AWS Lambdaはサーバーレスコンピューティングサービスで、サーバーを管理せずにコードを実行します。利点：1）サーバー管理不要、AWSがインフラストラクチャを担当；2）自動スケーリング、リクエスト量に応じて自動調整；3）使用量に応じた課金、実際の実行時間のみ課金；4）高可用性、障害を自動処理；5）複数のプログラミング言語をサポート；6）他のAWSサービスとの統合が良好。欠点：1）コールドスタート遅延、初回実行が遅い；2）実行時間制限、最長15分；3）メモリ制限、最大10GB；4）デバッグが困難、ローカルテストが複雑；5）ベンダーロックイン。適用場面：APIゲートウェイ、データ処理、定期タスク、イベント駆動アプリケーション。'
    },
    tags: ['Lambda', '无服务器', 'Serverless', '事件驱动'],
    difficulty: 'medium'
  },
  {
    id: 'aws-5',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS VPC？如何设计VPC网络架构？',
      ja: 'AWS VPCとは何ですか？VPCネットワークアーキテクチャをどのように設計しますか？'
    },
    answer: {
      zh: 'AWS VPC是虚拟私有云，在AWS云中创建隔离的网络环境。设计VPC架构：1）规划IP地址范围，使用私有IP地址段；2）创建子网，分为公有子网（可访问互联网）和私有子网（不能直接访问互联网）；3）配置路由表，控制网络流量；4）设置Internet Gateway，连接公有子网到互联网；5）配置NAT Gateway，让私有子网访问互联网；6）设置安全组和NACL，控制访问权限；7）VPC Peering，连接不同VPC。最佳实践：多可用区部署、网络分层、最小权限原则。',
      ja: 'AWS VPCは仮想プライベートクラウドで、AWSクラウド内に隔離されたネットワーク環境を作成します。VPCアーキテクチャの設計：1）IPアドレス範囲を計画し、プライベートIPアドレス段を使用；2）サブネットを作成し、パブリックサブネット（インターネットアクセス可能）とプライベートサブネット（インターネットに直接アクセス不可）に分ける；3）ルートテーブルを設定し、ネットワークトラフィックを制御；4）Internet Gatewayを設定し、パブリックサブネットをインターネットに接続；5）NAT Gatewayを設定し、プライベートサブネットがインターネットにアクセスできるようにする；6）セキュリティグループとNACLを設定し、アクセス権限を制御；7）VPC Peering、異なるVPCを接続。ベストプラクティス：マルチアベイラビリティゾーン展開、ネットワーク階層化、最小権限原則。'
    },
    tags: ['VPC', '虚拟私有云', '网络架构', '子网'],
    difficulty: 'hard'
  },
  {
    id: 'aws-6',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS IAM？如何实现安全的访问控制？',
      ja: 'AWS IAMとは何ですか？安全なアクセス制御をどのように実現しますか？'
    },
    answer: {
      zh: 'AWS IAM是身份和访问管理服务，控制谁可以访问哪些AWS资源。核心概念：1）用户（User），代表人员或应用程序；2）组（Group），用户的集合；3）角色（Role），可以被承担的身份；4）策略（Policy），定义权限的JSON文档。安全访问控制：1）最小权限原则，只给必要的权限；2）使用多因素认证（MFA）；3）定期轮换访问密钥；4）使用角色而不是长期凭证；5）启用CloudTrail记录API调用；6）使用策略模拟器测试权限。最佳实践：不使用root账户、为每个用户创建单独账户、使用组管理权限。',
      ja: 'AWS IAMはアイデンティティとアクセス管理サービスで、誰がどのAWSリソースにアクセスできるかを制御します。核心概念：1）ユーザー（User）、人員またはアプリケーションを代表；2）グループ（Group）、ユーザーの集合；3）ロール（Role）、引き受けることができるアイデンティティ；4）ポリシー（Policy）、権限を定義するJSON文書。安全なアクセス制御：1）最小権限の原則、必要な権限のみ付与；2）多要素認証（MFA）を使用；3）定期的にアクセスキーをローテーション；4）長期認証情報ではなくロールを使用；5）CloudTrailを有効にしてAPI呼び出しを記録；6）ポリシーシミュレーターを使用して権限をテスト。ベストプラクティス：rootアカウントを使用しない、各ユーザーに個別のアカウントを作成、グループで権限を管理。'
    },
    tags: ['IAM', '身份管理', '访问控制', '权限管理'],
    difficulty: 'medium'
  },
  {
    id: 'aws-7',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS RDS？如何选择合适的数据库引擎？',
      ja: 'AWS RDSとは何ですか？適切なデータベースエンジンをどのように選択しますか？'
    },
    answer: {
      zh: 'AWS RDS是关系型数据库服务，提供托管的数据库实例。支持的数据库引擎：1）MySQL，开源、成本低、适合Web应用；2）PostgreSQL，功能强大、支持复杂查询、适合企业应用；3）Oracle，商业数据库、功能丰富、适合大型企业；4）SQL Server，微软数据库、与.NET集成好；5）MariaDB，MySQL的分支、性能更好；6）Amazon Aurora，AWS自研、高性能、云原生。选择考虑因素：应用需求、性能要求、成本预算、团队技能、兼容性。RDS特性：自动备份、多可用区部署、只读副本、监控告警、自动故障转移。',
      ja: 'AWS RDSはリレーショナルデータベースサービスで、マネージドデータベースインスタンスを提供します。サポートされるデータベースエンジン：1）MySQL、オープンソース、低コスト、Webアプリケーションに適している；2）PostgreSQL、機能が強力、複雑なクエリをサポート、企業アプリケーションに適している；3）Oracle、商用データベース、機能が豊富、大企業に適している；4）SQL Server、Microsoftデータベース、.NETとの統合が良い；5）MariaDB、MySQLの分岐、パフォーマンスが良い；6）Amazon Aurora、AWS自社開発、高性能、クラウドネイティブ。選択考慮要因：アプリケーションニーズ、パフォーマンス要求、コスト予算、チームスキル、互換性。RDS特性：自動バックアップ、マルチアベイラビリティゾーン展開、読み取り専用レプリカ、監視アラート、自動フェイルオーバー。'
    },
    tags: ['RDS', '关系型数据库', '数据库引擎', 'Aurora'],
    difficulty: 'medium'
  },
  {
    id: 'aws-8',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS CloudFormation？如何使用基础设施即代码？',
      ja: 'AWS CloudFormationとは何ですか？Infrastructure as Codeをどのように使用しますか？'
    },
    answer: {
      zh: 'AWS CloudFormation是基础设施即代码服务，使用模板定义和部署AWS资源。模板格式：JSON或YAML，包含资源定义、参数、输出等。核心概念：1）模板（Template），定义资源的蓝图；2）堆栈（Stack），部署的资源集合；3）变更集（Change Set），预览堆栈变更；4）嵌套堆栈，组织复杂的基础设施。使用IaC的好处：版本控制、可重复部署、自动化、一致性、成本控制。最佳实践：模块化模板、使用参数和条件、标签资源、测试模板、使用Cross-Stack引用。',
      ja: 'AWS CloudFormationはInfrastructure as Codeサービスで、テンプレートを使用してAWSリソースを定義・デプロイします。テンプレート形式：JSONまたはYAML、リソース定義、パラメータ、出力などを含む。核心概念：1）テンプレート（Template）、リソースの設計図を定義；2）スタック（Stack）、デプロイされたリソースの集合；3）変更セット（Change Set）、スタック変更をプレビュー；4）ネストされたスタック、複雑なインフラストラクチャを組織。IaC使用の利点：バージョン管理、再現可能なデプロイメント、自動化、一貫性、コスト制御。ベストプラクティス：モジュール化テンプレート、パラメータと条件を使用、リソースにタグ付け、テンプレートをテスト、Cross-Stack参照を使用。'
    },
    tags: ['CloudFormation', '基础设施即代码', 'IaC', '模板'],
    difficulty: 'medium'
  },
  {
    id: 'aws-9',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS监控和日志？如何实现全面的监控？',
      ja: 'AWS監視とログとは何ですか？包括的な監視をどのように実現しますか？'
    },
    answer: {
      zh: 'AWS监控和日志服务帮助监控应用程序和基础设施。核心服务：1）CloudWatch，监控指标和日志；2）CloudTrail，记录API调用；3）X-Ray，分布式追踪；4）Config，配置管理和合规性。实现全面监控：1）设置CloudWatch指标和告警；2）收集应用程序日志到CloudWatch Logs；3）启用CloudTrail记录所有API调用；4）使用X-Ray追踪请求流程；5）创建仪表板展示关键指标；6）设置SNS通知；7）使用Lambda处理告警。监控最佳实践：监控关键指标、设置合理阈值、自动化响应、定期审查。',
      ja: 'AWS監視とログサービスは、アプリケーションとインフラストラクチャの監視を支援します。核心サービス：1）CloudWatch、メトリクスとログを監視；2）CloudTrail、API呼び出しを記録；3）X-Ray、分散トレーシング；4）Config、設定管理とコンプライアンス。包括的監視の実現：1）CloudWatchメトリクスとアラートを設定；2）アプリケーションログをCloudWatch Logsに収集；3）CloudTrailを有効にしてすべてのAPI呼び出しを記録；4）X-Rayを使用してリクエストフローを追跡；5）重要なメトリクスを表示するダッシュボードを作成；6）SNS通知を設定；7）Lambdaを使用してアラートを処理。監視ベストプラクティス：重要なメトリクスを監視、合理的な閾値を設定、自動化レスポンス、定期的なレビュー。'
    },
    tags: ['CloudWatch', '监控', '日志', 'X-Ray'],
    difficulty: 'medium'
  },
  {
    id: 'aws-10',
    category: 'technical',
    subcategory: 'aws',
    question: {
      zh: '什么是AWS成本优化？如何控制和优化AWS费用？',
      ja: 'AWSコスト最適化とは何ですか？AWS費用をどのように制御・最適化しますか？'
    },
    answer: {
      zh: 'AWS成本优化是控制和降低AWS使用成本的实践。成本优化策略：1）选择合适的定价模式，预留实例、竞价实例；2）合理调整实例大小，避免过度配置；3）使用自动扩缩容，根据需求调整资源；4）选择合适的存储类别，冷数据使用低成本存储；5）删除未使用的资源，如EBS卷、弹性IP；6）使用CloudWatch监控资源使用率；7）设置预算和告警；8）使用AWS Cost Explorer分析成本趋势。工具：AWS Trusted Advisor、Cost and Usage Report、AWS Budgets。最佳实践：定期审查账单、标记资源、制定成本分配策略。',
      ja: 'AWSコスト最適化は、AWS使用コストを制御・削減する実践です。コスト最適化戦略：1）適切な価格モデルを選択、リザーブドインスタンス、スポットインスタンス；2）インスタンスサイズを適切に調整、過剰な設定を避ける；3）自動スケーリングを使用、需要に応じてリソースを調整；4）適切なストレージクラスを選択、コールドデータには低コストストレージを使用；5）未使用リソースを削除、EBSボリューム、Elastic IPなど；6）CloudWatchを使用してリソース使用率を監視；7）予算とアラートを設定；8）AWS Cost Explorerでコスト傾向を分析。ツール：AWS Trusted Advisor、Cost and Usage Report、AWS Budgets。ベストプラクティス：定期的な請求書レビュー、リソースタグ付け、コスト配分戦略の策定。'
    },
    tags: ['成本优化', 'Cost Explorer', '预算管理', '资源优化'],
    difficulty: 'medium'
  }
] 