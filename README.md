# IT面试问题库 / IT面接質問集

一个专门为IT行业求职者设计的面试问题库网页应用，提供分类整理的面试问题和答案，支持中日文切换，并具有评分排序功能。

> 日本のIT求職者向けに設計された面接質問データベースWebアプリケーション。カテゴリ別に整理された面接質問と回答を提供し、中日文切り替えと評価ソート機能を備えています。

## ✨ 主要功能 / 主な機能

- 📚 **分类问题** - 按照技术领域和面试类型分类整理
- 🌐 **中日文切换** - 支持中文和日文实时切换
- ⭐ **评分系统** - 可以为问题评分并按评分排序
- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- 🎯 **针对性内容** - 专门为日本IT企业面试准备

## 🚀 技术栈

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Shadcn/ui
- **Icons**: Lucide React
- **部署**: Vercel

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
src/
├── app/                 # Next.js App Router
├── components/          # React组件
│   ├── ui/             # 基础UI组件
│   ├── QuestionCard.tsx
│   ├── CategoryCard.tsx
│   ├── LanguageToggle.tsx
│   └── ...
├── data/               # 数据文件
│   ├── questions.ts    # 面试问题数据
│   └── categories.ts   # 分类数据
├── hooks/              # 自定义Hook
├── lib/                # 工具函数
└── types/              # TypeScript类型定义
```

## 📝 添加新问题

在 `src/data/questions.ts` 文件中添加新的面试问题：

```typescript
{
  id: 'unique-id',
  category: 'technical', // 或 'general', 'japan-specific'
  subcategory: 'react',
  question: {
    zh: '中文问题',
    ja: '日本語の質問'
  },
  answer: {
    zh: '中文答案',
    ja: '日本語の回答'
  },
  tags: ['标签1', '标签2'],
  difficulty: 'medium' // 'easy', 'medium', 'hard'
}
```

## 🔧 自定义分类

在 `src/data/categories.ts` 文件中修改或添加新的分类：

```typescript
{
  id: 'category-id',
  name: {
    zh: '中文分类名',
    ja: '日本語カテゴリ名'
  },
  description: {
    zh: '中文描述',
    ja: '日本語の説明'
  },
  icon: 'IconName', // Lucide图标名称
  color: 'bg-blue-500' // Tailwind颜色类
}
```

## 🌍 部署到Vercel

1. 将代码推送到GitHub仓库
2. 在 [Vercel](https://vercel.com) 创建账户
3. 导入你的GitHub仓库
4. Vercel会自动检测Next.js项目并进行部署

## 📱 功能特色

### 🎯 针对日本IT市场
- 包含日本企业特色面试问题
- 文化适应性问题和答案
- 技术面试常见问题

### �� 智能学习功能
- 个人评分系统
- 按难度和评分排序
- 学习进度跟踪

### 🎨 现代化界面
- 美观的卡片式设计
- 流畅的动画效果
- 深色模式支持

## 🤝 贡献

欢迎提交问题和改进建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Shadcn/ui](https://ui.shadcn.com/) - UI组件库
- [Lucide](https://lucide.dev/) - 图标库

---

**为您的IT面试做好准备！/ IT面接の準備を万全に！** 🚀
