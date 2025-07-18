import { Question } from '@/types'

export const cloudQuestions: Question[] = [
  {
    id: 'cloud-1',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是云计算？云计算的服务模式有哪些？',
      ja: 'クラウドコンピューティングとは何ですか？クラウドコンピューティングのサービスモデルは何ですか？'
    },
    answer: {
      zh: '云计算就是通过互联网提供计算资源和服务，不需要自己维护服务器。有三种服务模式：IaaS（基础设施即服务），提供虚拟机、存储、网络等基础设施，比如AWS EC2；PaaS（平台即服务），提供开发和部署平台，比如Google App Engine；SaaS（软件即服务），提供现成的软件应用，比如Gmail、Office 365。云计算的好处是成本低、扩展性好、高可用性；缺点是依赖网络、安全性需要考虑、可能有厂商锁定问题。',
      ja: 'クラウドコンピューティングは、インターネットを通じてコンピューティングリソースとサービスを提供することで、自分でサーバーを維持する必要がありません。3つのサービスモデルがあります：IaaS（Infrastructure as a Service）は、仮想マシン、ストレージ、ネットワークなどのインフラストラクチャを提供し、例えばAWS EC2；PaaS（Platform as a Service）は、開発・デプロイメントプラットフォームを提供し、例えばGoogle App Engine；SaaS（Software as a Service）は、既成のソフトウェアアプリケーションを提供し、例えばGmail、Office 365。クラウドコンピューティングの利点は、コストが低く、拡張性が良く、高可用性があること；欠点は、ネットワークに依存し、セキュリティを考慮する必要があり、ベンダーロックインの問題がある可能性があります。'
    },
    tags: ['云计算', 'IaaS', 'PaaS', 'SaaS'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-2',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是Docker？容器和虚拟机的区别是什么？',
      ja: 'Dockerとは何ですか？コンテナと仮想マシンの違いは何ですか？'
    },
    answer: {
      zh: 'Docker是一个容器化平台，可以把应用程序和它的依赖打包成一个轻量级的容器。容器和虚拟机的区别：容器共享宿主机的操作系统内核，启动快、占用资源少；虚拟机有自己的完整操作系统，启动慢、占用资源多。容器像是在同一个房子里隔出不同的房间，虚拟机像是建造不同的房子。Docker的好处是环境一致性，开发、测试、生产环境都一样；部署简单，一个命令就能启动；资源利用率高。常用命令：docker run启动容器，docker build构建镜像，docker ps查看运行的容器。',
      ja: 'Dockerは、アプリケーションとその依存関係を軽量なコンテナにパッケージ化できるコンテナ化プラットフォームです。コンテナと仮想マシンの違い：コンテナはホストマシンのオペレーティングシステムカーネルを共有し、起動が速く、リソース使用量が少ない；仮想マシンは独自の完全なオペレーティングシステムを持ち、起動が遅く、リソース使用量が多い。コンテナは同じ家の中で異なる部屋を仕切るようなもので、仮想マシンは異なる家を建てるようなものです。Dockerの利点は、環境の一貫性で、開発、テスト、本番環境が同じ；デプロイメントが簡単で、一つのコマンドで起動できる；リソース利用率が高い。よく使うコマンド：docker runでコンテナ起動、docker buildでイメージ構築、docker psで実行中のコンテナを確認。'
    },
    tags: ['Docker', '容器化', '虚拟化'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-3',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是Kubernetes？它解决了什么问题？',
      ja: 'Kubernetesとは何ですか？どのような問題を解決しますか？'
    },
    answer: {
      zh: 'Kubernetes（K8s）是一个容器编排平台，用来管理大量的Docker容器。它解决的问题：容器数量多了难以管理；应用扩容缩容困难；容器故障后难以自动恢复；负载均衡和服务发现复杂。K8s的核心概念：Pod是最小部署单元，通常包含一个容器；Service提供稳定的网络访问；Deployment管理Pod的副本数量；Namespace提供资源隔离。K8s的好处是自动化运维，自动扩容、故障恢复；高可用性，容器挂了会自动重启；资源调度，合理分配CPU和内存。',
      ja: 'Kubernetes（K8s）は、大量のDockerコンテナを管理するためのコンテナオーケストレーションプラットフォームです。解決する問題：コンテナ数が多くなると管理が困難；アプリケーションのスケールアップ・ダウンが困難；コンテナ障害後の自動回復が困難；ロードバランシングとサービス発見が複雑。K8sの核心概念：Podは最小デプロイメント単位で、通常1つのコンテナを含む；Serviceは安定したネットワークアクセスを提供；DeploymentはPodのレプリカ数を管理；Namespaceはリソース分離を提供。K8sの利点は、自動化運用で、自動スケーリング、障害回復；高可用性で、コンテナが停止すると自動再起動；リソーススケジューリングで、CPUとメモリを合理的に割り当て。'
    },
    tags: ['Kubernetes', '容器编排', '微服务'],
    difficulty: 'hard'
  },
  {
    id: 'cloud-4',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是微服务架构？它有什么优缺点？',
      ja: 'マイクロサービスアーキテクチャとは何ですか？利点と欠点は何ですか？'
    },
    answer: {
      zh: '微服务架构是把一个大的应用程序拆分成多个小的独立服务，每个服务负责特定的业务功能。优点：独立开发部署，不同团队可以并行工作；技术栈灵活，每个服务可以用不同的语言；故障隔离，一个服务挂了不影响其他服务；扩展性好，可以针对性地扩展某个服务。缺点：系统复杂度增加，服务间通信、数据一致性困难；运维成本高，需要管理多个服务；网络延迟，服务间调用增加延迟；调试困难，问题可能涉及多个服务。适合大型项目和团队，小项目用单体架构更简单。',
      ja: 'マイクロサービスアーキテクチャは、大きなアプリケーションを複数の小さな独立したサービスに分割し、各サービスが特定のビジネス機能を担当することです。利点：独立した開発・デプロイメントで、異なるチームが並行して作業できる；技術スタックが柔軟で、各サービスが異なる言語を使用できる；障害分離で、一つのサービスが停止しても他のサービスに影響しない；拡張性が良く、特定のサービスを対象的にスケールできる。欠点：システムの複雑度が増加し、サービス間通信、データ一貫性が困難；運用コストが高く、複数のサービスを管理する必要がある；ネットワーク遅延で、サービス間呼び出しが遅延を増加させる；デバッグが困難で、問題が複数のサービスに関わる可能性がある。大規模プロジェクトとチームに適しており、小規模プロジェクトではモノリシックアーキテクチャの方が簡単です。'
    },
    tags: ['微服务', '架构设计', '分布式系统'],
    difficulty: 'hard'
  },
  {
    id: 'cloud-5',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是负载均衡？常见的负载均衡算法有哪些？',
      ja: 'ロードバランシングとは何ですか？一般的なロードバランシングアルゴリズムは何ですか？'
    },
    answer: {
      zh: '负载均衡是把请求分发到多个服务器上，避免单个服务器过载。常见的负载均衡算法：轮询（Round Robin），按顺序分发请求；加权轮询，根据服务器性能分配不同权重；最少连接，把请求发给连接数最少的服务器；IP哈希，根据客户端IP计算哈希值，保证同一IP总是访问同一服务器；随机算法，随机选择服务器。负载均衡的好处是提高系统性能和可用性，单个服务器故障不影响整体服务。实现方式有硬件负载均衡器、软件负载均衡器（如Nginx、HAProxy）、云服务商的负载均衡服务。',
      ja: 'ロードバランシングは、リクエストを複数のサーバーに分散させ、単一サーバーの過負荷を避けることです。一般的なロードバランシングアルゴリズム：ラウンドロビン（Round Robin）、順番にリクエストを分散；重み付きラウンドロビン、サーバーの性能に応じて異なる重みを割り当て；最少接続、接続数が最も少ないサーバーにリクエストを送信；IPハッシュ、クライアントIPのハッシュ値を計算し、同じIPが常に同じサーバーにアクセスすることを保証；ランダムアルゴリズム、ランダムにサーバーを選択。ロードバランシングの利点は、システムパフォーマンスと可用性を向上させ、単一サーバーの障害が全体のサービスに影響しないことです。実装方法には、ハードウェアロードバランサー、ソフトウェアロードバランサー（Nginx、HAProxyなど）、クラウドサービスプロバイダーのロードバランシングサービスがあります。'
    },
    tags: ['负载均衡', '高可用性', '性能优化'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-6',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是CDN？它是如何工作的？',
      ja: 'CDNとは何ですか？どのように動作しますか？'
    },
    answer: {
      zh: 'CDN（内容分发网络）是把网站内容缓存到全球各地的服务器上，用户访问时从最近的服务器获取内容。工作原理：用户请求资源时，CDN会根据用户地理位置、网络状况等因素，选择最优的边缘服务器返回内容；如果边缘服务器没有缓存，就回源到原始服务器获取。CDN的好处：加速访问，减少延迟；减轻源服务器压力；提高可用性，单个节点故障不影响整体服务；节省带宽成本。适用场景：静态资源（图片、CSS、JS文件）、视频流媒体、下载文件等。常见的CDN服务商有阿里云、腾讯云、AWS CloudFront等。',
      ja: 'CDN（Content Delivery Network）は、ウェブサイトのコンテンツを世界各地のサーバーにキャッシュし、ユーザーがアクセスする際に最も近いサーバーからコンテンツを取得することです。動作原理：ユーザーがリソースをリクエストする際、CDNはユーザーの地理的位置、ネットワーク状況などの要因に基づいて、最適なエッジサーバーを選択してコンテンツを返します；エッジサーバーにキャッシュがない場合、オリジンサーバーに戻って取得します。CDNの利点：アクセス高速化、遅延削減；ソースサーバーの負荷軽減；可用性向上、単一ノードの障害が全体のサービスに影響しない；帯域幅コスト削減。適用場面：静的リソース（画像、CSS、JSファイル）、動画ストリーミング、ダウンロードファイルなど。一般的なCDNサービスプロバイダーには、阿里云、腾讯云、AWS CloudFrontなどがあります。'
    },
    tags: ['CDN', '内容分发', '性能优化'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-7',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是自动扩缩容？如何实现自动扩缩容？',
      ja: 'オートスケーリングとは何ですか？どのように実現しますか？'
    },
    answer: {
      zh: '自动扩缩容是根据系统负载自动增加或减少服务器资源。实现方式：垂直扩容（Scale Up），增加单个服务器的CPU、内存等资源；水平扩容（Scale Out），增加服务器数量。触发条件：CPU使用率、内存使用率、请求数量、响应时间等指标超过阈值。实现工具：云服务商提供的Auto Scaling服务，如AWS Auto Scaling、阿里云弹性伸缩；Kubernetes的HPA（水平Pod自动扩缩容）。好处是节省成本，按需使用资源；提高可用性，自动应对流量峰值；减少运维工作量。注意事项：设置合理的扩缩容策略，避免频繁扩缩容；考虑应用的启动时间和预热时间。',
      ja: 'オートスケーリングは、システム負荷に応じてサーバーリソースを自動的に増減することです。実現方法：垂直スケーリング（Scale Up）、単一サーバーのCPU、メモリなどのリソースを増加；水平スケーリング（Scale Out）、サーバー数を増加。トリガー条件：CPU使用率、メモリ使用率、リクエスト数、レスポンス時間などの指標が閾値を超えた場合。実現ツール：クラウドサービスプロバイダーのAuto Scalingサービス、例えばAWS Auto Scaling、阿里云弹性伸缩；KubernetesのHPA（水平Pod自動スケーリング）。利点は、コスト削減、必要に応じてリソースを使用；可用性向上、トラフィックピークに自動対応；運用作業量削減。注意事項：合理的なスケーリング戦略を設定し、頻繁なスケーリングを避ける；アプリケーションの起動時間とウォームアップ時間を考慮。'
    },
    tags: ['自动扩缩容', '弹性伸缩', '资源管理'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-8',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是云存储？常见的云存储类型有哪些？',
      ja: 'クラウドストレージとは何ですか？一般的なクラウドストレージの種類は何ですか？'
    },
    answer: {
      zh: '云存储是通过网络提供数据存储服务，不需要自己维护存储设备。常见类型：对象存储（如AWS S3），适合存储图片、视频、备份文件等非结构化数据；块存储（如AWS EBS），提供高性能的磁盘存储，适合数据库；文件存储（如AWS EFS），提供共享文件系统，多个服务器可以同时访问。存储类别：热存储，访问频繁，价格较高；冷存储，访问不频繁，价格便宜；归档存储，长期保存，价格最低但访问慢。选择考虑因素：访问频率、性能要求、成本预算、数据安全性。云存储的好处是无限扩展、高可用性、按需付费。',
      ja: 'クラウドストレージは、ネットワークを通じてデータストレージサービスを提供し、自分でストレージデバイスを維持する必要がないことです。一般的な種類：オブジェクトストレージ（AWS S3など）、画像、動画、バックアップファイルなどの非構造化データの保存に適している；ブロックストレージ（AWS EBSなど）、高性能なディスクストレージを提供し、データベースに適している；ファイルストレージ（AWS EFSなど）、共有ファイルシステムを提供し、複数のサーバーが同時にアクセスできる。ストレージクラス：ホットストレージ、アクセス頻度が高く、価格が高い；コールドストレージ、アクセス頻度が低く、価格が安い；アーカイブストレージ、長期保存、価格が最も低いがアクセスが遅い。選択考慮要因：アクセス頻度、性能要求、コスト予算、データセキュリティ。クラウドストレージの利点は、無限拡張、高可用性、従量課金制です。'
    },
    tags: ['云存储', '对象存储', '数据管理'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-9',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是Serverless？它有什么优缺点？',
      ja: 'Serverlessとは何ですか？利点と欠点は何ですか？'
    },
    answer: {
      zh: 'Serverless（无服务器）是一种云计算模式，开发者只需要关注代码，不需要管理服务器。代表服务：AWS Lambda、阿里云函数计算、腾讯云云函数。工作原理：代码以函数形式部署，有请求时自动启动执行，执行完就销毁。优点：无需管理服务器，运维成本低；自动扩缩容，按需执行；按使用量付费，成本可控；快速开发部署。缺点：冷启动延迟，函数第一次执行较慢；执行时间限制，通常几分钟；调试困难，本地测试复杂；厂商锁定，迁移困难。适用场景：事件驱动的应用、定时任务、API网关、数据处理等。',
      ja: 'Serverless（サーバーレス）は、開発者がコードにのみ集中し、サーバーを管理する必要がないクラウドコンピューティングモデルです。代表的なサービス：AWS Lambda、阿里云函数计算、腾讯云云函数。動作原理：コードを関数として展開し、リクエストがあると自動的に起動・実行し、実行完了後は破棄されます。利点：サーバー管理不要、運用コストが低い；自動スケーリング、オンデマンド実行；使用量に応じた課金、コスト管理可能；迅速な開発・デプロイメント。欠点：コールドスタート遅延、関数の初回実行が遅い；実行時間制限、通常数分；デバッグが困難、ローカルテストが複雑；ベンダーロックイン、移行が困難。適用場面：イベント駆動型アプリケーション、定期タスク、APIゲートウェイ、データ処理など。'
    },
    tags: ['Serverless', '函数计算', '事件驱动'],
    difficulty: 'medium'
  },
  {
    id: 'cloud-10',
    category: 'technical',
    subcategory: 'cloud',
    question: {
      zh: '什么是多云和混合云？它们有什么区别？',
      ja: 'マルチクラウドとハイブリッドクラウドとは何ですか？違いは何ですか？'
    },
    answer: {
      zh: '多云是同时使用多个云服务商的服务，比如同时用AWS、Azure、阿里云；混合云是公有云和私有云的结合，部分业务放在公有云，部分放在私有云。区别：多云关注的是避免厂商锁定，提高可用性；混合云关注的是数据安全和合规性。多云的好处：避免单一厂商依赖、成本优化、高可用性；缺点是管理复杂、技术栈不统一。混合云的好处：数据安全可控、满足合规要求、灵活部署；缺点是架构复杂、运维成本高。选择策略：大企业通常选择混合云，保证核心数据安全；初创企业可以选择多云，降低成本和风险。',
      ja: 'マルチクラウドは複数のクラウドサービスプロバイダーのサービスを同時に使用することで、例えばAWS、Azure、阿里云を同時に使用；ハイブリッドクラウドはパブリッククラウドとプライベートクラウドの組み合わせで、一部のビジネスをパブリッククラウドに、一部をプライベートクラウドに配置します。違い：マルチクラウドはベンダーロックインを避け、可用性を向上させることに焦点を当てる；ハイブリッドクラウドはデータセキュリティとコンプライアンスに焦点を当てる。マルチクラウドの利点：単一ベンダーへの依存を避ける、コスト最適化、高可用性；欠点は管理が複雑、技術スタックが統一されていない。ハイブリッドクラウドの利点：データセキュリティが制御可能、コンプライアンス要件を満たす、柔軟な展開；欠点は、アーキテクチャが複雑、運用コストが高い。選択戦略：大企業は通常ハイブリッドクラウドを選択し、コアデータのセキュリティを保証；スタートアップはマルチクラウドを選択し、コストとリスクを削減できます。'
    },
    tags: ['多云', '混合云', '云战略'],
    difficulty: 'medium'
  }
] 