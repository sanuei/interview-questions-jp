import { Question } from '@/types'

export const javaQuestions: Question[] = [
  {
    id: 'java-1',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '请解释Java中的面向对象编程特性',
      ja: 'Javaのオブジェクト指向プログラミングの特徴を説明してください'
    },
    answer: {
      zh: 'Java的面向对象编程有四个主要特性。首先是封装，就是把数据和方法包装在一个类里面，外部不能直接访问内部的数据，只能通过提供的方法来操作，这样保证了数据的安全性。然后是继承，子类可以继承父类的属性和方法，这样可以重用代码，不用重复写相同的功能。第三个是多态，同一个方法在不同的对象上可以有不同的行为，比如动物类的叫声方法，猫和狗的实现就不一样。最后是抽象，可以定义抽象类和接口，只定义方法的规范，具体实现由子类来完成。',
      ja: 'Javaのオブジェクト指向プログラミングには4つの主要な特徴があります。まずカプセル化です。データとメソッドを1つのクラスに包装して、外部から内部のデータに直接アクセスできないようにし、提供されたメソッドを通じてのみ操作できます。これでデータの安全性が保証されます。次に継承です。子クラスは親クラスの属性とメソッドを継承でき、コードを再利用できて、同じ機能を繰り返し書く必要がありません。3つ目は多態性です。同じメソッドが異なるオブジェクトで異なる動作をします。例えば、動物クラスの鳴き声メソッドで、猫と犬の実装は違います。最後に抽象化です。抽象クラスとインターフェースを定義して、メソッドの仕様だけを定義し、具体的な実装は子クラスが行います。'
    },
    tags: ['面向对象', 'Java基础'],
    difficulty: 'medium'
  },
  {
    id: 'java-2',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '什么是Java虚拟机（JVM）？',
      ja: 'Java仮想マシン（JVM）とは何ですか？'
    },
    answer: {
      zh: 'JVM就是Java虚拟机，它是Java程序运行的环境。简单来说，我们写的Java代码会被编译成字节码，然后JVM把这些字节码翻译成机器码来执行。JVM的好处是实现了"一次编写，到处运行"，因为不同的操作系统都有对应的JVM，所以同一份Java程序可以在Windows、Linux、Mac上运行。JVM还负责内存管理，比如垃圾回收，自动释放不用的内存。它还有类加载器来加载我们需要的类，有执行引擎来执行字节码。',
      ja: 'JVMはJava仮想マシンで、Javaプログラムが実行される環境です。簡単に言うと、私たちが書いたJavaコードはバイトコードにコンパイルされ、JVMがこのバイトコードをマシンコードに翻訳して実行します。JVMの利点は「一度書けば、どこでも実行」を実現することです。異なるOSにはそれぞれ対応するJVMがあるので、同じJavaプログラムがWindows、Linux、Macで実行できます。JVMはメモリ管理も担当していて、ガベージコレクションで使わないメモリを自動的に解放します。また、必要なクラスを読み込むクラスローダーや、バイトコードを実行する実行エンジンもあります。'
    },
    tags: ['JVM', 'Java基础'],
    difficulty: 'medium'
  },
  {
    id: 'java-3',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '解释Java中的垃圾回收机制',
      ja: 'Javaのガベージコレクション機構を説明してください'
    },
    answer: {
      zh: 'Java的垃圾回收就是自动管理内存的机制。当我们创建对象的时候，JVM会在堆内存中分配空间，当这个对象不再被使用的时候，垃圾回收器会自动把它清理掉，释放内存。垃圾回收器怎么知道哪些对象可以清理呢？主要是通过引用计数和可达性分析。如果一个对象没有任何引用指向它，或者从根对象开始找不到它，那就可以被回收了。常见的垃圾回收算法有标记-清除、复制算法、标记-整理等。这个机制的好处是程序员不用手动管理内存，避免了内存泄漏的问题。',
      ja: 'Javaのガベージコレクションは自動的にメモリを管理する仕組みです。オブジェクトを作成する時、JVMはヒープメモリに領域を割り当てます。そのオブジェクトが使われなくなったら、ガベージコレクターが自動的にそれを清理してメモリを解放します。ガベージコレクターはどのオブジェクトが清理できるかをどうやって知るのでしょうか？主に参照カウントと到達可能性分析を通じてです。オブジェクトを指す参照がなかったり、ルートオブジェクトから見つからなかったりすると、回収できます。よくあるガベージコレクションアルゴリズムには、マーク・スイープ、コピーアルゴリズム、マーク・コンパクトなどがあります。この仕組みの利点は、プログラマーが手動でメモリを管理する必要がなく、メモリリークの問題を避けられることです。'
    },
    tags: ['垃圾回收', 'JVM'],
    difficulty: 'medium'
  },
  {
    id: 'java-4',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: 'String、StringBuilder和StringBuffer的区别是什么？',
      ja: 'String、StringBuilder、StringBufferの違いは何ですか？'
    },
    answer: {
      zh: '这三个都是处理字符串的，但是有很大区别。String是不可变的，每次修改都会创建新的对象，所以如果频繁修改字符串，会产生很多垃圾对象，性能不好。StringBuilder是可变的，修改的时候不会创建新对象，而是在原来的基础上修改，所以性能比较好，但是它不是线程安全的。StringBuffer也是可变的，功能和StringBuilder差不多，但是它的方法都加了synchronized关键字，所以是线程安全的，不过性能会稍微差一点。一般来说，单线程用StringBuilder，多线程用StringBuffer，如果字符串不怎么变化就用String。',
      ja: 'この3つはすべて文字列を処理するものですが、大きな違いがあります。Stringは不変で、修正するたびに新しいオブジェクトを作成するので、頻繁に文字列を修正すると多くのガベージオブジェクトが生成され、パフォーマンスが悪くなります。StringBuilderは可変で、修正時に新しいオブジェクトを作成せず、元のベースで修正するので、パフォーマンスが良いですが、スレッドセーフではありません。StringBufferも可変で、機能はStringBuilderとほぼ同じですが、メソッドにsynchronizedキーワードが付いているので、スレッドセーフです。ただし、パフォーマンスは少し劣ります。一般的に、シングルスレッドではStringBuilder、マルチスレッドではStringBuffer、文字列があまり変化しない場合はStringを使います。'
    },
    tags: ['String', 'StringBuilder', 'StringBuffer'],
    difficulty: 'medium'
  },
  {
    id: 'java-5',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '什么是Java中的多线程？如何创建线程？',
      ja: 'Javaのマルチスレッドとは何ですか？スレッドをどのように作成しますか？'
    },
    answer: {
      zh: '多线程就是程序可以同时执行多个任务，提高程序的执行效率。Java中创建线程有几种方法。第一种是继承Thread类，重写run方法，然后调用start()方法启动线程。第二种是实现Runnable接口，实现run方法，然后把它传给Thread构造函数。第三种是实现Callable接口，这个可以有返回值，配合FutureTask使用。还有就是使用线程池，通过Executors.newFixedThreadPool()等方法创建。我个人比较推荐实现Runnable接口的方式，因为Java是单继承的，实现接口更灵活。',
      ja: 'マルチスレッドはプログラムが同時に複数のタスクを実行できることで、プログラムの実行効率を向上させます。Javaでスレッドを作成する方法はいくつかあります。1つ目はThreadクラスを継承して、runメソッドをオーバーライドし、start()メソッドを呼び出してスレッドを開始します。2つ目はRunnableインターフェースを実装して、runメソッドを実装し、それをThreadコンストラクタに渡します。3つ目はCallableインターフェースを実装することで、これは戻り値を持つことができ、FutureTaskと組み合わせて使います。それから、スレッドプールを使って、Executors.newFixedThreadPool()などのメソッドで作成することもできます。個人的にはRunnableインターフェースを実装する方法をお勧めします。Javaは単一継承なので、インターフェースを実装する方がより柔軟です。'
    },
    tags: ['多线程', 'Thread', 'Runnable'],
    difficulty: 'medium'
  },
  {
    id: 'java-6',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '解释Java中的异常处理机制',
      ja: 'Javaの例外処理機構を説明してください'
    },
    answer: {
      zh: 'Java的异常处理主要用try-catch-finally语句。当程序运行出现问题的时候，会抛出异常，我们可以用try块包围可能出错的代码，用catch块来捕获和处理异常，finally块里的代码不管有没有异常都会执行，通常用来释放资源。Java的异常分为两种：checked异常和unchecked异常。checked异常在编译时就要处理，比如IOException；unchecked异常是运行时异常，比如NullPointerException。我们也可以用throws关键字把异常抛给调用者处理，或者用throw主动抛出异常。',
      ja: 'Javaの例外処理は主にtry-catch-finally文を使います。プログラム実行時に問題が発生すると、例外がスローされます。tryブロックでエラーが起こりそうなコードを囲み、catchブロックで例外をキャッチして処理し、finallyブロックのコードは例外があってもなくても実行されます。通常、リソースの解放に使われます。Javaの例外にはchecked例外とunchecked例外の2種類があります。checked例外はコンパイル時に処理する必要があり、例えばIOExceptionです。unchecked例外は実行時例外で、例えばNullPointerExceptionです。throwsキーワードで例外を呼び出し元に投げて処理してもらったり、throwで積極的に例外を投げたりすることもできます。'
    },
    tags: ['异常处理', 'try-catch'],
    difficulty: 'medium'
  },
  {
    id: 'java-7',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '什么是Java集合框架？常用的集合类有哪些？',
      ja: 'Javaのコレクションフレームワークとは何ですか？よく使われるコレクションクラスは何ですか？'
    },
    answer: {
      zh: 'Java集合框架就是一套用来存储和操作对象的API。主要分为两大类：Collection和Map。Collection下面有List、Set、Queue等。List是有序的，可以重复，常用的有ArrayList、LinkedList、Vector。ArrayList底层是数组，查询快但插入删除慢；LinkedList是链表，插入删除快但查询慢。Set是无序的，不能重复，常用的有HashSet、TreeSet。Map是键值对的形式，常用的有HashMap、TreeMap、Hashtable。HashMap是最常用的，基于哈希表实现，查询效率高；TreeMap是基于红黑树，可以排序。',
      ja: 'Javaのコレクションフレームワークは、オブジェクトを格納・操作するためのAPIセットです。主にCollectionとMapの2つに分かれます。Collectionの下にはList、Set、Queueなどがあります。Listは順序があり、重複可能で、よく使われるのはArrayList、LinkedList、Vectorです。ArrayListは配列ベースで、検索は速いですが挿入・削除は遅いです。LinkedListはリンクリストで、挿入・削除は速いですが検索は遅いです。Setは順序がなく、重複不可で、よく使われるのはHashSet、TreeSetです。Mapはキーと値のペアの形式で、よく使われるのはHashMap、TreeMap、Hashtableです。HashMapが最もよく使われ、ハッシュテーブルベースで検索効率が高いです。TreeMapは赤黒木ベースで、ソートできます。'
    },
    tags: ['集合框架', 'ArrayList', 'HashMap'],
    difficulty: 'medium'
  },
  {
    id: 'java-8',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '什么是Spring框架？它的核心特性是什么？',
      ja: 'Springフレームワークとは何ですか？その核心的な特徴は何ですか？'
    },
    answer: {
      zh: 'Spring是Java开发中最流行的框架之一，它简化了企业级应用的开发。Spring的核心特性主要有几个：首先是IOC（控制反转），就是把对象的创建和依赖关系交给Spring容器来管理，我们不用自己new对象了。然后是AOP（面向切面编程），可以把横切关注点（比如日志、事务）从业务逻辑中分离出来。还有就是Spring提供了很多模块，比如Spring MVC用于web开发，Spring Data用于数据访问，Spring Security用于安全控制等。Spring还支持声明式事务管理，用注解就可以控制事务。',
      ja: 'Springは、Java開発で最も人気のあるフレームワークの1つで、エンタープライズアプリケーションの開発を簡素化します。Springの核心的な特徴はいくつかあります。まずIOC（制御の反転）です。オブジェクトの作成と依存関係をSpringコンテナに管理させて、私たちが自分でオブジェクトをnewする必要がありません。次にAOP（アスペクト指向プログラミング）です。横断的関心事（ログ、トランザクションなど）をビジネスロジックから分離できます。それから、Springは多くのモジュールを提供しています。例えば、Spring MVCはWeb開発用、Spring Dataはデータアクセス用、Spring Securityはセキュリティ制御用などです。Springは宣言的トランザクション管理もサポートしていて、アノテーションでトランザクションを制御できます。'
    },
    tags: ['Spring', 'IOC', 'AOP'],
    difficulty: 'medium'
  },
  {
    id: 'java-9',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '解释Java中的反射机制',
      ja: 'Javaのリフレクション機構を説明してください'
    },
    answer: {
      zh: '反射就是程序在运行时可以检查和操作类、方法、属性等的能力。简单来说，就是可以动态地获取类的信息，创建对象，调用方法。比如我们可以通过Class.forName()获取一个类的Class对象，然后通过getDeclaredMethods()获取这个类的所有方法，通过newInstance()创建对象实例。反射的好处是增加了程序的灵活性，很多框架都用到了反射，比如Spring的IOC容器。但是反射也有缺点，性能比较慢，而且破坏了封装性，可能会访问到private的成员。',
      ja: 'リフレクションは、プログラムが実行時にクラス、メソッド、プロパティなどを検査・操作できる能力です。簡単に言うと、動的にクラスの情報を取得し、オブジェクトを作成し、メソッドを呼び出すことができます。例えば、Class.forName()でクラスのClassオブジェクトを取得し、getDeclaredMethods()でそのクラスのすべてのメソッドを取得し、newInstance()でオブジェクトインスタンスを作成できます。リフレクションの利点は、プログラムの柔軟性を高めることで、多くのフレームワークでリフレクションが使われています。例えば、SpringのIOCコンテナなどです。しかし、リフレクションには欠点もあり、パフォーマンスが遅く、カプセル化を破壊してprivateメンバーにアクセスできてしまう可能性があります。'
    },
    tags: ['反射', 'Class', '动态调用'],
    difficulty: 'hard'
  },
  {
    id: 'java-10',
    category: 'technical',
    subcategory: 'java',
    question: {
      zh: '什么是Java 8的Lambda表达式？有什么优势？',
      ja: 'Java 8のラムダ式とは何ですか？どのような利点がありますか？'
    },
    answer: {
      zh: 'Lambda表达式是Java 8引入的新特性，它让我们可以用更简洁的方式写代码。Lambda表达式本质上是一个匿名函数，可以作为参数传递给方法。比如以前我们要写一个Comparator，需要写很多代码，现在用Lambda就可以写成(a, b) -> a.compareTo(b)这样。Lambda的优势主要有几个：代码更简洁，可读性更好；支持函数式编程；配合Stream API使用可以很方便地处理集合数据。Lambda表达式让Java更现代化了，写起来更像Python或者JavaScript。',
      ja: 'ラムダ式はJava 8で導入された新機能で、より簡潔にコードを書くことができます。ラムダ式は本質的に匿名関数で、メソッドにパラメータとして渡すことができます。例えば、以前Comparatorを書くには多くのコードが必要でしたが、今はラムダを使って(a, b) -> a.compareTo(b)のように書けます。ラムダの利点は主にいくつかあります：コードがより簡潔になり、可読性が向上します；関数型プログラミングをサポートします；Stream APIと組み合わせて使うと、コレクションデータを便利に処理できます。ラムダ式によってJavaがより現代的になり、PythonやJavaScriptのように書けるようになりました。'
    },
    tags: ['Lambda', 'Java 8', '函数式编程'],
    difficulty: 'medium'
  }
] 