import { Question } from '@/types'

export const javaQuestions: Question[] = [
  {
    id: 'tech-java-1',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '请解释Java中的面向对象编程概念',
      ja: 'Javaのオブジェクト指向プログラミングの概念を説明してください'
    },
    answer: {
      zh: 'Java中的面向对象编程包含四个基本概念：1. 封装(Encapsulation) - 将数据和方法封装在类中，通过访问修饰符控制访问权限；2. 继承(Inheritance) - 子类可以继承父类的属性和方法，实现代码复用；3. 多态(Polymorphism) - 同一接口可以有不同的实现，运行时确定具体调用哪个实现；4. 抽象(Abstraction) - 通过抽象类和接口定义抽象概念，隐藏实现细节。',
      ja: 'Javaのオブジェクト指向プログラミングには4つの基本概念があります：1. カプセル化 - データとメソッドをクラス内に封じ込め、アクセス修飾子でアクセス権を制御；2. 継承 - 子クラスが親クラスの属性とメソッドを継承し、コードの再利用を実現；3. ポリモーフィズム - 同一インターフェースが異なる実装を持ち、実行時に具体的な実装を決定；4. 抽象化 - 抽象クラスとインターフェースで抽象概念を定義し、実装詳細を隠蔽。'
    },
    tags: ['Java', 'OOP', '基础概念'],
    difficulty: 'medium'
  },
  {
    id: 'tech-java-2',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: 'Java中的HashMap和ConcurrentHashMap有什么区别？',
      ja: 'JavaのHashMapとConcurrentHashMapの違いは何ですか？'
    },
    answer: {
      zh: '主要区别包括：1. 线程安全性 - HashMap不是线程安全的，ConcurrentHashMap是线程安全的；2. 性能 - HashMap在单线程环境下性能更好，ConcurrentHashMap在多线程环境下性能优异；3. 实现机制 - ConcurrentHashMap使用分段锁(Segment)或CAS操作来保证线程安全；4. Null值 - HashMap允许null key和null value，ConcurrentHashMap不允许；5. 迭代器 - HashMap的迭代器是fail-fast的，ConcurrentHashMap是fail-safe的。',
      ja: '主な違いは以下の通りです：1. スレッドセーフティ - HashMapはスレッドセーフではなく、ConcurrentHashMapはスレッドセーフです；2. パフォーマンス - HashMapは単一スレッド環境で優れ、ConcurrentHashMapはマルチスレッド環境で優秀です；3. 実装メカニズム - ConcurrentHashMapは分割ロック（Segment）やCAS操作でスレッドセーフを保証；4. Null値 - HashMapはnull keyとnull valueを許可し、ConcurrentHashMapは許可しません；5. イテレータ - HashMapのイテレータはfail-fast、ConcurrentHashMapはfail-safeです。'
    },
    tags: ['Java', 'HashMap', '并发编程'],
    difficulty: 'hard'
  },
  {
    id: 'tech-java-3',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '请解释Java的垃圾回收机制',
      ja: 'Javaのガベージコレクション機構を説明してください'
    },
    answer: {
      zh: 'Java垃圾回收机制自动管理内存，主要特点：1. 自动内存管理 - 自动回收不再使用的对象内存；2. 分代收集 - 将堆内存分为年轻代和老年代，使用不同的回收策略；3. 常见算法 - 标记-清除、复制算法、标记-整理等；4. 垃圾收集器 - Serial、Parallel、CMS、G1等不同类型；5. 根可达性 - 通过GC Roots判断对象是否可回收；6. 调优参数 - 可以通过JVM参数调优垃圾回收性能。',
      ja: 'Javaのガベージコレクション機構は自動的にメモリを管理し、主な特徴は：1. 自動メモリ管理 - 使用されなくなったオブジェクトのメモリを自動回収；2. 世代別収集 - ヒープメモリを若い世代と古い世代に分割し、異なる回収戦略を使用；3. 一般的なアルゴリズム - マーク&スイープ、コピーアルゴリズム、マーク&コンパクトなど；4. ガベージコレクタ - Serial、Parallel、CMS、G1などの異なるタイプ；5. ルート到達可能性 - GC Rootsを通じてオブジェクトが回収可能かを判断；6. チューニングパラメータ - JVMパラメータでガベージコレクションのパフォーマンスを調整可能。'
    },
    tags: ['Java', 'GC', 'メモリ管理'],
    difficulty: 'hard'
  }
] 