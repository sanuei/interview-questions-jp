#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * 构建配置
 */
const BUILD_CONFIG = {
  questionsDir: path.join(__dirname, '../data/questions'),
  technicalDir: path.join(__dirname, '../data/questions/technical'),
  outputFile: path.join(__dirname, '../data/questions/index.ts'),
  backupDir: path.join(__dirname, '../data/backups'),
  
  // 文件映射
  sourceFiles: {
    general: 'general.ts',
    'japan-specific': 'japan-specific.ts',
    technical: {
      java: 'technical/java.ts',
      frontend: 'technical/frontend.ts',
      backend: 'technical/index.ts', // 从index文件导入
      database: 'technical/index.ts',
      cloud: 'technical/index.ts',
      'system-design': 'technical/index.ts',
      devops: 'technical/index.ts',
      security: 'technical/index.ts',
      algorithms: 'technical/index.ts'
    }
  }
}

/**
 * 创建备份
 */
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFile = path.join(BUILD_CONFIG.backupDir, `questions-backup-${timestamp}.ts`)
  
  // 确保备份目录存在
  if (!fs.existsSync(BUILD_CONFIG.backupDir)) {
    fs.mkdirSync(BUILD_CONFIG.backupDir, { recursive: true })
  }
  
  // 如果输出文件存在，创建备份
  if (fs.existsSync(BUILD_CONFIG.outputFile)) {
    fs.copyFileSync(BUILD_CONFIG.outputFile, backupFile)
    console.log(`📦 已创建备份: ${backupFile}`)
  }
}

/**
 * 读取和解析TypeScript文件
 */
function readQuestionFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`)
      return []
    }

    const content = fs.readFileSync(filePath, 'utf8')
    
    // 提取导出的数组变量名
    const exportMatch = content.match(/export\s+const\s+(\w+Questions?)\s*:\s*Question\[\]\s*=\s*\[/)
    if (!exportMatch) {
      console.log(`⚠️  无法找到问题数组: ${filePath}`)
      return []
    }
    
    const arrayName = exportMatch[1]
    console.log(`📖 读取文件: ${filePath} (${arrayName})`)
    
    return {
      arrayName,
      filePath,
      content
    }
  } catch (error) {
    console.error(`❌ 读取文件失败 ${filePath}:`, error.message)
    return []
  }
}

/**
 * 生成聚合的index文件
 */
function generateIndexFile() {
  console.log('🔨 开始构建问题索引文件...')
  
  const imports = []
  const exports = []
  const aggregations = []
  
  // 处理通用问题
  const generalFile = readQuestionFile(path.join(BUILD_CONFIG.questionsDir, 'general.ts'))
  if (generalFile.arrayName) {
    imports.push(`import { ${generalFile.arrayName} } from './general'`)
    exports.push(generalFile.arrayName)
  }
  
  // 处理日本特色问题
  const japanFile = readQuestionFile(path.join(BUILD_CONFIG.questionsDir, 'japan-specific.ts'))
  if (japanFile.arrayName) {
    imports.push(`import { ${japanFile.arrayName} } from './japan-specific'`)
    exports.push(japanFile.arrayName)
  }
  
  // 处理技术问题
  const technicalIndexFile = readQuestionFile(path.join(BUILD_CONFIG.technicalDir, 'index.ts'))
  if (technicalIndexFile.arrayName) {
    imports.push(`import { technicalQuestions } from './technical'`)
    exports.push('technicalQuestions')
  }
  
  // 生成文件内容
  const indexContent = `import { Question } from '@/types'
${imports.join('\n')}

// 聚合所有问题
export const allQuestions: Question[] = [
  ...${exports.join(',\n  ...')}
]

// 按分类导出
export {
  ${exports.join(',\n  ')}
}

// 默认导出所有问题（保持向后兼容）
export default allQuestions

// 统计信息
export const questionStats = {
  total: allQuestions.length,
  byCategory: {
    general: ${exports.includes('generalQuestions') ? 'generalQuestions.length' : '0'},
    japanSpecific: ${exports.includes('japanSpecificQuestions') ? 'japanSpecificQuestions.length' : '0'},
    technical: ${exports.includes('technicalQuestions') ? 'technicalQuestions.length' : '0'}
  },
  lastUpdated: '${new Date().toISOString()}'
}
`

  return indexContent
}

/**
 * 验证生成的内容
 */
function validateGeneratedContent(content) {
  // 基本语法检查
  if (!content.includes('export const allQuestions')) {
    throw new Error('生成的内容缺少主要导出')
  }
  
  if (!content.includes('import { Question }')) {
    throw new Error('生成的内容缺少类型导入')
  }
  
  console.log('✅ 内容验证通过')
  return true
}

/**
 * 更新package.json脚本
 */
function updatePackageScripts() {
  const packagePath = path.join(__dirname, '../../package.json')
  
  if (fs.existsSync(packagePath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
      
      // 添加自定义脚本
      if (!packageJson.scripts) {
        packageJson.scripts = {}
      }
      
      packageJson.scripts['questions:generate'] = 'node src/scripts/generate-question.js'
      packageJson.scripts['questions:validate'] = 'node src/scripts/validate-questions.js'
      packageJson.scripts['questions:build'] = 'node src/scripts/build-questions.js'
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8')
      console.log('📝 已更新 package.json 脚本')
    } catch (error) {
      console.log('⚠️  无法更新 package.json:', error.message)
    }
  }
}

/**
 * 生成使用说明文档
 */
function generateREADME() {
  const readmeContent = `# IT面试问题库 - 数据管理

## 项目结构

\`\`\`
src/data/questions/
├── index.ts              # 主入口文件，聚合所有问题
├── general.ts            # 通用面试问题
├── japan-specific.ts     # 日本企业特色问题
└── technical/           # 技术问题目录
    ├── index.ts         # 技术问题聚合文件
    ├── java.ts          # Java开发问题
    ├── frontend.ts      # 前端开发问题
    └── ...              # 其他技术分类
\`\`\`

## 管理脚本

### 1. 生成新问题
\`\`\`bash
npm run questions:generate
\`\`\`
交互式问题生成器，帮助创建格式正确的问题。

### 2. 验证问题数据
\`\`\`bash
npm run questions:validate
\`\`\`
验证所有问题数据的格式和完整性。

### 3. 构建问题索引
\`\`\`bash
npm run questions:build
\`\`\`
重新生成主索引文件，聚合所有分类的问题。

## 添加新问题的步骤

1. **使用生成器（推荐）**：
   \`\`\`bash
   npm run questions:generate
   \`\`\`

2. **手动添加**：
   - 选择合适的文件（如 \`technical/java.ts\`）
   - 按照现有格式添加问题
   - 运行验证：\`npm run questions:validate\`
   - 重新构建：\`npm run questions:build\`

## 问题格式规范

\`\`\`typescript
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
\`\`\`

## 注意事项

- ID必须唯一
- 所有问题必须有中日双语版本
- 技术问题建议设置子分类
- 运行验证确保数据质量
- 修改后重新构建索引文件
`

  const readmePath = path.join(__dirname, '../data/questions/README.md')
  fs.writeFileSync(readmePath, readmeContent, 'utf8')
  console.log('📚 已生成使用说明文档')
}

/**
 * 主构建函数
 */
async function buildQuestions() {
  console.log('🏗️  IT面试问题构建器')
  console.log('=' .repeat(50))
  
  try {
    // 创建备份
    createBackup()
    
    // 生成新的索引文件内容
    const indexContent = generateIndexFile()
    
    // 验证生成的内容
    validateGeneratedContent(indexContent)
    
    // 写入文件
    fs.writeFileSync(BUILD_CONFIG.outputFile, indexContent, 'utf8')
    console.log(`✅ 已生成索引文件: ${BUILD_CONFIG.outputFile}`)
    
    // 更新package.json脚本
    updatePackageScripts()
    
    // 生成使用说明
    generateREADME()
    
    // 显示统计信息
    console.log('\n📊 构建统计:')
    console.log('  - 已处理的文件类型: general, japan-specific, technical')
    console.log('  - 生成的文件: index.ts')
    console.log('  - 创建的脚本: 3个管理脚本')
    
    console.log('\n🎉 构建完成！')
    console.log('\n📋 可用的管理命令:')
    console.log('  npm run questions:generate  # 生成新问题')
    console.log('  npm run questions:validate  # 验证数据')
    console.log('  npm run questions:build     # 重新构建')
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message)
    process.exit(1)
  }
}

// 运行构建
if (require.main === module) {
  buildQuestions()
}

module.exports = { buildQuestions } 