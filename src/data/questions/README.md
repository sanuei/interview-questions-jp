# IT面试问题库 - 数据管理

## 项目结构

```
src/data/questions/
├── index.ts              # 主入口文件，聚合所有问题
├── general.ts            # 通用面试问题
├── japan-specific.ts     # 日本企业特色问题
└── technical/           # 技术问题目录
    ├── index.ts         # 技术问题聚合文件
    ├── java.ts          # Java开发问题
    ├── frontend.ts      # 前端开发问题
    └── ...              # 其他技术分类
```

## 管理脚本

### 1. 生成新问题
```bash
npm run questions:generate
```
交互式问题生成器，帮助创建格式正确的问题。

### 2. 验证问题数据
```bash
npm run questions:validate
```
验证所有问题数据的格式和完整性。

### 3. 构建问题索引
```bash
npm run questions:build
```
重新生成主索引文件，聚合所有分类的问题。

## 添加新问题的步骤

1. **使用生成器（推荐）**：
   ```bash
   npm run questions:generate
   ```

2. **手动添加**：
   - 选择合适的文件（如 `technical/java.ts`）
   - 按照现有格式添加问题
   - 运行验证：`npm run questions:validate`
   - 重新构建：`npm run questions:build`

## 问题格式规范

```typescript
{
  id: 'unique-question-id',
  category: 'general' | 'japan-specific' | 'technical',
  subcategory?: 'java' | 'frontend' | ...,  // 技术问题必须
  question: {
    zh: '中文问题',
    ja: '日本語質問'
  },
  answer: {
    zh: '中文回答',
    ja: '日本語回答'
  },
  tags: ['标签1', '标签2'],
  difficulty: 'easy' | 'medium' | 'hard'
}
```

## 注意事项

- ID必须唯一
- 所有问题必须有中日双语版本
- 技术问题建议设置子分类
- 运行验证确保数据质量
- 修改后重新构建索引文件
