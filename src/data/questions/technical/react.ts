import { Question } from '@/types'

export const reactQuestions: Question[] = [
  {
    id: 'react-1',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React？React有什么特点？',
      ja: 'Reactとは何ですか？Reactの特徴は何ですか？'
    },
    answer: {
      zh: 'React是Facebook开发的用于构建用户界面的JavaScript库。特点：1）组件化，将UI拆分成独立的、可复用的组件；2）虚拟DOM，通过JavaScript对象模拟真实DOM，提高性能；3）单向数据流，数据从父组件流向子组件，易于调试；4）声明式编程，描述UI应该是什么样子，而不是如何实现；5）JSX语法，可以在JavaScript中写类似HTML的代码；6）生态丰富，有大量的第三方库和工具。React让前端开发更加模块化和可维护。',
      ja: 'ReactはFacebookが開発したユーザーインターフェース構築用のJavaScriptライブラリです。特徴：1）コンポーネント化、UIを独立した再利用可能なコンポーネントに分割；2）仮想DOM、JavaScriptオブジェクトで実際のDOMを模擬し、パフォーマンスを向上；3）単方向データフロー、データが親コンポーネントから子コンポーネントに流れ、デバッグが容易；4）宣言的プログラミング、UIがどのようであるべきかを記述し、実装方法ではない；5）JSX構文、JavaScriptでHTMLのようなコードを書くことができる；6）豊富なエコシステム、大量のサードパーティライブラリとツール。Reactはフロントエンド開発をよりモジュール化し、保守しやすくします。'
    },
    tags: ['React', '组件化', '虚拟DOM', 'JSX'],
    difficulty: 'medium'
  },
  {
    id: 'react-2',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React Hooks？常用的Hooks有哪些？',
      ja: 'React Hooksとは何ですか？よく使われるHooksは何ですか？'
    },
    answer: {
      zh: 'React Hooks是React 16.8引入的新特性，让函数组件也能使用状态和其他React特性。常用Hooks：1）useState，管理组件状态；2）useEffect，处理副作用，如数据获取、订阅等；3）useContext，使用React Context；4）useReducer，管理复杂状态；5）useMemo，缓存计算结果；6）useCallback，缓存函数；7）useRef，访问DOM元素或保存可变值；8）useLayoutEffect，同步执行副作用。Hooks的好处：逻辑复用、代码简洁、避免class组件的复杂性。使用Hooks要遵循Hooks规则：只在顶层调用，不在循环或条件语句中调用。',
      ja: 'React HooksはReact 16.8で導入された新機能で、関数コンポーネントでも状態や他のReact機能を使用できるようにします。よく使われるHooks：1）useState、コンポーネントの状態を管理；2）useEffect、副作用を処理、データ取得、購読など；3）useContext、React Contextを使用；4）useReducer、複雑な状態を管理；5）useMemo、計算結果をキャッシュ；6）useCallback、関数をキャッシュ；7）useRef、DOM要素にアクセスまたは可変値を保存；8）useLayoutEffect、副作用を同期実行。Hooksの利点：ロジックの再利用、コードの簡潔性、クラスコンポーネントの複雑さを回避。Hooksを使用する際はHooksルールに従う：トップレベルでのみ呼び出し、ループや条件文では呼び出さない。'
    },
    tags: ['React Hooks', 'useState', 'useEffect', '函数组件'],
    difficulty: 'medium'
  },
  {
    id: 'react-3',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React生命周期？主要的生命周期方法有哪些？',
      ja: 'Reactライフサイクルとは何ですか？主要なライフサイクルメソッドは何ですか？'
    },
    answer: {
      zh: 'React生命周期是组件从创建到销毁的整个过程。主要生命周期方法：1）挂载阶段：constructor（构造函数）、componentDidMount（组件挂载后）；2）更新阶段：componentDidUpdate（组件更新后）、getSnapshotBeforeUpdate（更新前获取快照）；3）卸载阶段：componentWillUnmount（组件卸载前）；4）错误处理：componentDidCatch（捕获错误）。React 16.3后，一些生命周期方法被废弃：componentWillMount、componentWillReceiveProps、componentWillUpdate。新增了getDerivedStateFromProps、getSnapshotBeforeUpdate等。函数组件使用useEffect来模拟生命周期。',
      ja: 'Reactライフサイクルは、コンポーネントが作成されてから破棄されるまでの全プロセスです。主要なライフサイクルメソッド：1）マウント段階：constructor（コンストラクタ）、componentDidMount（コンポーネントマウント後）；2）更新段階：componentDidUpdate（コンポーネント更新後）、getSnapshotBeforeUpdate（更新前にスナップショット取得）；3）アンマウント段階：componentWillUnmount（コンポーネントアンマウント前）；4）エラー処理：componentDidCatch（エラーキャッチ）。React 16.3以降、一部のライフサイクルメソッドが廃止：componentWillMount、componentWillReceiveProps、componentWillUpdate。getDerivedStateFromProps、getSnapshotBeforeUpdateなどが新たに追加。関数コンポーネントはuseEffectを使用してライフサイクルを模擬します。'
    },
    tags: ['React生命周期', 'componentDidMount', 'useEffect', '类组件'],
    difficulty: 'medium'
  },
  {
    id: 'react-4',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React状态管理？Redux和Context API的区别是什么？',
      ja: 'React状態管理とは何ですか？ReduxとContext APIの違いは何ですか？'
    },
    answer: {
      zh: 'React状态管理是管理应用程序中数据状态的方式。Redux是第三方状态管理库，特点：1）单一数据源，整个应用状态存储在一个store中；2）状态只读，只能通过dispatch action来修改；3）纯函数reducer，描述状态如何变化；4）时间旅行调试，可以回溯状态变化。Context API是React内置的状态管理方案，用于跨组件共享数据。区别：Redux适合大型应用，功能强大但复杂；Context API适合中小型应用，简单易用但性能较差。选择建议：简单的全局状态用Context API，复杂的状态管理用Redux。',
      ja: 'React状態管理は、アプリケーション内のデータ状態を管理する方法です。Reduxはサードパーティの状態管理ライブラリで、特徴：1）単一データソース、アプリケーション全体の状態を1つのstoreに保存；2）状態は読み取り専用、dispatch actionでのみ変更可能；3）純粋関数reducer、状態の変化方法を記述；4）タイムトラベルデバッグ、状態変化を遡ることができる。Context APIはReact内蔵の状態管理ソリューションで、コンポーネント間でのデータ共有に使用。違い：Reduxは大規模アプリケーションに適し、機能が強力だが複雑；Context APIは中小規模アプリケーションに適し、シンプルで使いやすいが性能が劣る。選択提案：シンプルなグローバル状態はContext API、複雑な状態管理はReduxを使用。'
    },
    tags: ['状态管理', 'Redux', 'Context API', '全局状态'],
    difficulty: 'medium'
  },
  {
    id: 'react-5',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React性能优化？常见的优化方法有哪些？',
      ja: 'Reactパフォーマンス最適化とは何ですか？一般的な最適化方法は何ですか？'
    },
    answer: {
      zh: 'React性能优化是提高React应用运行效率的技术。常见优化方法：1）使用React.memo包装组件，避免不必要的重新渲染；2）使用useMemo缓存计算结果；3）使用useCallback缓存函数；4）合理使用key属性，帮助React识别列表项变化；5）代码分割（Code Splitting），使用React.lazy和Suspense按需加载组件；6）虚拟化长列表，只渲染可见区域的项目；7）避免在render中创建新对象或函数；8）使用生产环境构建；9）使用React DevTools Profiler分析性能瓶颈。关键是要找到性能瓶颈，针对性地优化。',
      ja: 'Reactパフォーマンス最適化は、Reactアプリケーションの実行効率を向上させる技術です。一般的な最適化方法：1）React.memoでコンポーネントをラップし、不要な再レンダリングを避ける；2）useMemoで計算結果をキャッシュ；3）useCallbackで関数をキャッシュ；4）key属性を適切に使用し、Reactがリストアイテムの変化を識別するのを助ける；5）コード分割（Code Splitting）、React.lazyとSuspenseを使用してコンポーネントをオンデマンドで読み込み；6）長いリストの仮想化、可視領域のアイテムのみをレンダリング；7）render内での新しいオブジェクトや関数の作成を避ける；8）本番環境ビルドを使用；9）React DevTools Profilerでパフォーマンスボトルネックを分析。重要なのは、パフォーマンスボトルネックを見つけ、対象的に最適化することです。'
    },
    tags: ['性能优化', 'React.memo', 'useMemo', 'useCallback'],
    difficulty: 'hard'
  },
  {
    id: 'react-6',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React Router？如何实现路由导航？',
      ja: 'React Routerとは何ですか？ルーティングナビゲーションをどのように実装しますか？'
    },
    answer: {
      zh: 'React Router是React的路由库，用于实现单页应用的页面导航。核心概念：1）BrowserRouter，使用HTML5 history API的路由器；2）Route，定义路径和组件的映射关系；3）Link，声明式导航链接；4）useNavigate，编程式导航；5）useParams，获取URL参数；6）useLocation，获取当前位置信息。实现路由导航：使用BrowserRouter包装应用，用Route定义路由规则，用Link或useNavigate进行导航。嵌套路由：在父路由组件中定义子路由。路由守卫：可以创建高阶组件来实现权限控制。',
      ja: 'React RouterはReactのルーティングライブラリで、シングルページアプリケーションのページナビゲーションを実現します。核心概念：1）BrowserRouter、HTML5 history APIを使用するルーター；2）Route、パスとコンポーネントのマッピング関係を定義；3）Link、宣言的ナビゲーションリンク；4）useNavigate、プログラム的ナビゲーション；5）useParams、URLパラメータを取得；6）useLocation、現在の位置情報を取得。ルーティングナビゲーションの実装：BrowserRouterでアプリケーションをラップし、Routeでルーティングルールを定義し、LinkまたはuseNavigateでナビゲーション。ネストされたルーティング：親ルートコンポーネント内で子ルートを定義。ルートガード：高階コンポーネントを作成して権限制御を実現可能。'
    },
    tags: ['React Router', '路由导航', 'BrowserRouter', 'useNavigate'],
    difficulty: 'medium'
  },
  {
    id: 'react-7',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React表单处理？受控组件和非受控组件的区别是什么？',
      ja: 'Reactフォーム処理とは何ですか？制御されたコンポーネントと制御されていないコンポーネントの違いは何ですか？'
    },
    answer: {
      zh: 'React表单处理是管理表单输入和验证的方式。受控组件：表单元素的值由React状态控制，通过onChange事件更新状态，表单数据完全由React管理。非受控组件：表单元素的值由DOM自身管理，使用ref获取值，React只在需要时读取。区别：受控组件数据流清晰，易于验证和处理，但代码较多；非受控组件代码简单，但数据流不清晰。推荐使用受控组件，因为更符合React的数据流理念。表单库如Formik、React Hook Form可以简化表单处理。',
      ja: 'Reactフォーム処理は、フォーム入力と検証を管理する方法です。制御されたコンポーネント：フォーム要素の値がReact状態によって制御され、onChangeイベントで状態を更新し、フォームデータは完全にReactによって管理されます。制御されていないコンポーネント：フォーム要素の値はDOM自身によって管理され、refを使用して値を取得し、Reactは必要時にのみ読み取ります。違い：制御されたコンポーネントはデータフローが明確で、検証と処理が容易だが、コードが多い；制御されていないコンポーネントはコードがシンプルだが、データフローが不明確。制御されたコンポーネントの使用を推奨、Reactのデータフロー理念により適合。Formik、React Hook Formなどのフォームライブラリでフォーム処理を簡素化できます。'
    },
    tags: ['表单处理', '受控组件', '非受控组件', 'onChange'],
    difficulty: 'medium'
  },
  {
    id: 'react-8',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React测试？常用的测试工具和方法有哪些？',
      ja: 'Reactテストとは何ですか？よく使われるテストツールと方法は何ですか？'
    },
    answer: {
      zh: 'React测试是验证React组件功能和行为的过程。常用测试工具：1）Jest，JavaScript测试框架，提供断言、模拟、覆盖率等功能；2）React Testing Library，专注于测试用户行为而不是实现细节；3）Enzyme，提供组件的浅渲染和深渲染；4）Cypress，端到端测试工具。测试方法：1）单元测试，测试单个组件；2）集成测试，测试多个组件协作；3）快照测试，比较组件渲染结果；4）端到端测试，模拟用户完整操作流程。测试原则：测试用户行为而不是实现细节，保持测试简单和可维护。',
      ja: 'ReactテストはReactコンポーネントの機能と動作を検証するプロセスです。よく使われるテストツール：1）Jest、JavaScriptテストフレームワーク、アサーション、モック、カバレッジなどの機能を提供；2）React Testing Library、実装詳細ではなくユーザー行動のテストに焦点；3）Enzyme、コンポーネントの浅いレンダリングと深いレンダリングを提供；4）Cypress、エンドツーエンドテストツール。テスト方法：1）単体テスト、単一コンポーネントをテスト；2）統合テスト、複数コンポーネントの協力をテスト；3）スナップショットテスト、コンポーネントレンダリング結果を比較；4）エンドツーエンドテスト、ユーザーの完全な操作フローを模擬。テスト原則：実装詳細ではなくユーザー行動をテストし、テストをシンプルで保守しやすく保つ。'
    },
    tags: ['React测试', 'Jest', 'React Testing Library', '单元测试'],
    difficulty: 'medium'
  },
  {
    id: 'react-9',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React Server Components？它解决了什么问题？',
      ja: 'React Server Componentsとは何ですか？どのような問題を解決しますか？'
    },
    answer: {
      zh: 'React Server Components是React的新特性，允许组件在服务器端渲染，只将结果发送到客户端。解决的问题：1）减少JavaScript包大小，服务器组件不会包含在客户端bundle中；2）提高首屏加载速度，服务器直接返回渲染结果；3）更好的SEO，搜索引擎可以直接索引服务器渲染的内容；4）减少客户端计算，复杂逻辑在服务器执行。工作原理：服务器组件在服务器渲染，客户端组件在浏览器渲染，两者可以混合使用。注意事项：服务器组件不能使用浏览器API，不能有状态和事件处理。目前还在实验阶段，Next.js等框架已经开始支持。',
      ja: 'React Server ComponentsはReactの新機能で、コンポーネントをサーバーサイドでレンダリングし、結果のみをクライアントに送信することを可能にします。解決する問題：1）JavaScriptバンドルサイズの削減、サーバーコンポーネントはクライアントバンドルに含まれない；2）初回画面読み込み速度の向上、サーバーが直接レンダリング結果を返す；3）より良いSEO、検索エンジンがサーバーレンダリングされたコンテンツを直接インデックス可能；4）クライアント計算の削減、複雑なロジックをサーバーで実行。動作原理：サーバーコンポーネントはサーバーでレンダリング、クライアントコンポーネントはブラウザでレンダリング、両者を混合使用可能。注意事項：サーバーコンポーネントはブラウザAPIを使用できず、状態やイベント処理を持てない。現在はまだ実験段階で、Next.jsなどのフレームワークがサポートを開始。'
    },
    tags: ['Server Components', '服务器渲染', 'SSR', 'Next.js'],
    difficulty: 'hard'
  },
  {
    id: 'react-10',
    category: 'technical',
    subcategory: 'react',
    question: {
      zh: '什么是React Concurrent Features？包括哪些功能？',
      ja: 'React Concurrent Featuresとは何ですか？どのような機能が含まれますか？'
    },
    answer: {
      zh: 'React Concurrent Features是React 18引入的并发特性，让React能够同时处理多个任务，提高用户体验。主要功能：1）Suspense，用于数据获取和代码分割，显示加载状态；2）Concurrent Rendering，可以中断和恢复渲染过程；3）Automatic Batching，自动批处理状态更新；4）startTransition，标记非紧急更新，避免阻塞用户交互；5）useDeferredValue，延迟更新非关键值；6）useTransition，处理过渡状态。好处：更流畅的用户体验，更好的性能，更智能的渲染优先级。使用场景：大量数据渲染、复杂动画、搜索框实时搜索等。',
      ja: 'React Concurrent FeaturesはReact 18で導入された並行機能で、Reactが複数のタスクを同時に処理し、ユーザー体験を向上させることを可能にします。主要機能：1）Suspense、データ取得とコード分割に使用、ローディング状態を表示；2）Concurrent Rendering、レンダリングプロセスを中断・再開可能；3）Automatic Batching、状態更新を自動的にバッチ処理；4）startTransition、非緊急更新をマークし、ユーザーインタラクションをブロックしない；5）useDeferredValue、非重要値の更新を遅延；6）useTransition、遷移状態を処理。利点：よりスムーズなユーザー体験、より良いパフォーマンス、よりスマートなレンダリング優先度。使用場面：大量データレンダリング、複雑なアニメーション、検索ボックスのリアルタイム検索など。'
    },
    tags: ['Concurrent Features', 'Suspense', 'startTransition', 'React 18'],
    difficulty: 'hard'
  }
] 