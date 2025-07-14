# IT面试问题库 - 管理系统文档

## 项目结构重构

我们已经成功将原本的单一问题文件拆分为模块化的管理结构：

### 文件组织结构

```
src/data/questions/
├── index.ts              # 主入口文件，聚合所有问题
├── general.ts            # 通用面试问题 (5个问题)
├── japan-specific.ts     # 日本企业特色问题 (3个问题)
├── technical/           # 技术问题目录
│   ├── index.ts         # 技术问题聚合文件
│   ├── java.ts          # Java开发问题 (3个问题)
│   └── frontend.ts      # 前端开发问题 (3个问题)
└── README.md            # 详细使用说明

src/scripts/
├── generate-question.js    # 交互式问题生成器
├── validate-questions.js   # 数据验证脚本
├── build-questions.js      # 构建聚合脚本
└── templates/
    └── question-template.ts # 问题模板和类型定义
```

## 自动化管理脚本

### 1. 问题生成器 📝
```bash
npm run questions:generate
```

**功能：**
- 交互式命令行界面
- 支持所有分类（通用、日本特色、技术）
- 自动生成唯一ID
- 格式验证
- 自动保存到对应文件

**使用流程：**
1. 选择问题分类
2. 选择子分类（如果适用）
3. 输入中日双语问题和答案
4. 设置标签和难度
5. 预览生成的代码
6. 选择保存到文件

### 2. 数据验证器 ✅
```bash
npm run questions:validate
```

**验证项目：**
- 必填字段检查
- ID唯一性验证
- 分类和子分类有效性
- 多语言内容完整性
- 标签和难度格式
- 内容质量检查

**验证结果：**
- 通过/失败统计
- 详细错误报告
- 警告提示

### 3. 构建工具 🔨
```bash
npm run questions:build
```

**功能：**
- 自动备份现有数据
- 重新生成主索引文件
- 更新统计信息
- 生成使用文档
- 更新package.json脚本

## 问题数据格式规范

### 标准格式
```typescript
{
  id: 'category-subcategory-timestamp-random',
  category: 'general' | 'japan-specific' | 'technical',
  subcategory?: string,  // 技术问题必须设置
  question: {
    zh: '中文问题内容',
    ja: '日本語質問内容'
  },
  answer: {
    zh: '中文回答要点和建议',
    ja: '日本語回答のポイントとアドバイス'
  },
  tags: ['标签1', '标签2'],
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### 分类说明

#### 通用面试问题 (general)
- **子分类：** self-intro, strengths-weaknesses, career-goals, motivation
- **特点：** 适用于所有IT职位的基础问题
- **示例：** 自我介绍、优缺点分析、职业规划等

#### 日本企业特色问题 (japan-specific)
- **特点：** 针对日本工作文化和企业环境
- **示例：** 工作文化理解、语言能力、团队协作等

#### 技术面试问题 (technical)
- **子分类：** java, frontend, backend, database, cloud, system-design, devops, security, algorithms
- **特点：** 技术深度问题，需要专业知识
- **示例：** 编程概念、框架使用、系统设计等

## 添加新问题的最佳实践

### 1. 使用生成器（推荐）
```bash
npm run questions:generate
```
自动处理ID生成、格式验证、文件保存等。

### 2. 手动添加步骤
1. 选择合适的文件（如 `technical/java.ts`）
2. 复制现有问题格式
3. 修改内容，确保中日文对应
4. 运行验证：`npm run questions:validate`
5. 重新构建：`npm run questions:build`

### 3. 质量标准
- **ID唯一性：** 每个问题必须有唯一标识符
- **双语完整：** 中日文内容必须完整对应
- **内容质量：** 问题明确，答案有价值
- **标签合理：** 使用相关、有意义的标签
- **难度准确：** 正确评估问题难度

## 扩展新分类

### 添加技术子分类
1. 在 `technical/` 目录创建新文件（如 `python.ts`）
2. 按照现有格式定义问题数组
3. 在 `technical/index.ts` 中导入和聚合
4. 更新模板文件中的分类列表
5. 运行构建脚本更新索引

### 添加新主分类
1. 在 `questions/` 目录创建新文件
2. 定义问题数组和导出
3. 更新主 `index.ts` 文件
4. 更新脚本中的分类配置
5. 更新验证规则

## 维护和监控

### 定期检查
- 运行验证脚本确保数据质量
- 检查是否有重复或过时的问题
- 更新答案内容以反映最新技术

### 备份策略
- 构建脚本自动创建备份
- 版本控制系统保存历史
- 重要更新前手动备份

### 性能考虑
- 监控问题数量对加载性能的影响
- 考虑实施懒加载或分页
- 优化搜索和筛选功能

## 故障排除

### 常见问题

1. **构建失败**
   - 检查TypeScript语法错误
   - 确认所有导入路径正确
   - 运行验证脚本检查数据格式

2. **ESLint错误**
   - 脚本文件已排除在ESLint检查外
   - 数据文件需要符合TypeScript规范

3. **ID冲突**
   - 运行验证脚本检测重复ID
   - 使用生成器确保ID唯一性

### 开发调试
```bash
# 检查数据完整性
npm run questions:validate

# 重新构建索引
npm run questions:build

# 启动开发服务器
npm run dev
```

## 团队协作

### 贡献指南
1. 使用问题生成器添加新内容
2. 运行验证确保质量
3. 提交前运行构建脚本
4. 包含有意义的提交信息

### 代码审查要点
- 问题内容的准确性和实用性
- 中日文翻译的质量
- 标签和分类的合理性
- 格式和结构的一致性

---

## 总结

通过这套管理系统，我们实现了：

✅ **模块化结构** - 按分类组织，易于维护
✅ **自动化工具** - 生成、验证、构建一体化
✅ **质量保证** - 多层次验证确保数据质量
✅ **易于扩展** - 清晰的结构便于添加新内容
✅ **团队协作** - 标准化流程支持多人协作

这个系统不仅解决了当前的问题管理需求，还为未来的扩展和维护奠定了坚实基础。 