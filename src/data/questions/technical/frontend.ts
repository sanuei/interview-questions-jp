import { Question } from '@/types'

export const frontendQuestions: Question[] = [
  {
    id: 'tech-frontend-1',
    category: 'technical',
    subcategory: 'frontend',
    question: {
      zh: 'React中的useEffect Hook有什么作用？如何正确使用？',
      ja: 'ReactのuseEffect Hookの役割は何ですか？正しい使い方は？'
    },
    answer: {
      zh: 'useEffect Hook用于处理副作用操作，包括：1. 数据获取 - API调用、订阅等；2. DOM操作 - 直接操作DOM元素；3. 定时器 - setTimeout、setInterval；4. 清理操作 - 组件卸载时的清理。正确使用方式：指定依赖数组来控制何时执行，返回清理函数避免内存泄漏，避免在effect中直接修改state导致无限循环。',
      ja: 'useEffect Hookは副作用操作を処理するために使用され、以下が含まれます：1. データ取得 - API呼び出し、サブスクリプションなど；2. DOM操作 - DOM要素の直接操作；3. タイマー - setTimeout、setInterval；4. クリーンアップ操作 - コンポーネントアンマウント時のクリーンアップ。正しい使用方法：依存配列を指定して実行タイミングを制御、クリーンアップ関数を返してメモリリークを防ぐ、effect内で直接stateを変更して無限ループを避ける。'
    },
    tags: ['React', 'Hook', '前端'],
    difficulty: 'medium'
  },
  {
    id: 'tech-frontend-2',
    category: 'technical',
    subcategory: 'frontend',
    question: {
      zh: '什么是虚拟DOM？它的优势是什么？',
      ja: 'Virtual DOMとは何ですか？その利点は何ですか？'
    },
    answer: {
      zh: '虚拟DOM是对真实DOM的JavaScript抽象表示。优势包括：1. 性能优化 - 通过diff算法最小化DOM操作；2. 批量更新 - 将多个变更合并为一次DOM更新；3. 跨浏览器兼容 - 抽象化处理浏览器差异；4. 可预测性 - 函数式编程思想，状态变化可预测；5. 开发体验 - 声明式编程，易于理解和维护；6. 服务端渲染 - 支持SSR，提升首屏加载速度。',
      ja: 'Virtual DOMは真のDOMのJavaScript抽象表現です。利点には以下があります：1. パフォーマンス最適化 - diffアルゴリズムでDOM操作を最小化；2. バッチ更新 - 複数の変更を一度のDOM更新にまとめる；3. クロスブラウザ互換性 - ブラウザの違いを抽象化；4. 予測可能性 - 関数型プログラミングの思想、状態変化が予測可能；5. 開発体験 - 宣言的プログラミング、理解と保守が容易；6. サーバーサイドレンダリング - SSRをサポート、初期画面読み込み速度を向上。'
    },
    tags: ['Virtual DOM', 'React', 'パフォーマンス'],
    difficulty: 'medium'
  },
  {
    id: 'tech-frontend-3',
    category: 'technical',
    subcategory: 'frontend',
    question: {
      zh: 'CSS的盒模型是什么？有哪些类型？',
      ja: 'CSSのボックスモデルとは何ですか？どのような種類がありますか？'
    },
    answer: {
      zh: 'CSS盒模型定义了元素在页面中的空间占用方式，包含四个部分：1. 内容(Content) - 元素的实际内容；2. 内边距(Padding) - 内容与边框之间的空间；3. 边框(Border) - 围绕内容和内边距的线；4. 外边距(Margin) - 元素与其他元素之间的空间。两种类型：标准盒模型(box-sizing: content-box)和IE盒模型(box-sizing: border-box)，区别在于width和height的计算方式不同。',
      ja: 'CSSボックスモデルは、ページ内の要素の空間占有方法を定義し、4つの部分を含みます：1. コンテンツ（Content） - 要素の実際の内容；2. パディング（Padding） - コンテンツとボーダーの間のスペース；3. ボーダー（Border） - コンテンツとパディングを囲む線；4. マージン（Margin） - 要素と他の要素の間のスペース。2つのタイプ：標準ボックスモデル（box-sizing: content-box）とIEボックスモデル（box-sizing: border-box）、widthとheightの計算方法の違いがあります。'
    },
    tags: ['CSS', 'ボックスモデル', '基础概念'],
    difficulty: 'easy'
  }
] 