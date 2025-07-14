#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 验证配置
const VALIDATION_CONFIG = {
  required_fields: ['id', 'category', 'question', 'answer', 'tags', 'difficulty'],
  valid_categories: ['general', 'japan-specific', 'technical'],
  valid_difficulties: ['easy', 'medium', 'hard'],
  technical_subcategories: ['java', 'frontend', 'backend', 'database', 'cloud', 'system-design', 'devops', 'security', 'algorithms'],
  general_subcategories: ['self-intro', 'strengths-weaknesses', 'career-goals', 'motivation'],
  language_fields: ['question', 'answer'],
  required_languages: ['zh', 'ja']
}

// 验证结果统计
let validationResults = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
}

/**
 * 验证单个问题对象
 */
function validateQuestion(question, index, filename) {
  const errors = []
  const warnings = []

  // 检查必填字段
  for (const field of VALIDATION_CONFIG.required_fields) {
    if (!question.hasOwnProperty(field)) {
      errors.push(`缺少必填字段: ${field}`)
    } else if (question[field] === null || question[field] === undefined) {
      errors.push(`字段 ${field} 不能为空`)
    }
  }

  // 验证ID格式
  if (question.id) {
    if (typeof question.id !== 'string' || question.id.trim() === '') {
      errors.push('ID必须是非空字符串')
    } else if (!/^[a-zA-Z0-9-_]+$/.test(question.id)) {
      warnings.push('ID包含特殊字符，建议只使用字母、数字、连字符和下划线')
    }
  }

  // 验证分类
  if (question.category && !VALIDATION_CONFIG.valid_categories.includes(question.category)) {
    errors.push(`无效的分类: ${question.category}，有效值为: ${VALIDATION_CONFIG.valid_categories.join(', ')}`)
  }

  // 验证子分类
  if (question.subcategory) {
    if (question.category === 'technical' && !VALIDATION_CONFIG.technical_subcategories.includes(question.subcategory)) {
      errors.push(`无效的技术子分类: ${question.subcategory}`)
    } else if (question.category === 'general' && !VALIDATION_CONFIG.general_subcategories.includes(question.subcategory)) {
      warnings.push(`通用问题的子分类 ${question.subcategory} 不在预定义列表中`)
    }
  } else if (question.category === 'technical') {
    warnings.push('技术问题建议设置子分类')
  }

  // 验证难度
  if (question.difficulty && !VALIDATION_CONFIG.valid_difficulties.includes(question.difficulty)) {
    errors.push(`无效的难度: ${question.difficulty}，有效值为: ${VALIDATION_CONFIG.valid_difficulties.join(', ')}`)
  }

  // 验证多语言字段
  for (const field of VALIDATION_CONFIG.language_fields) {
    if (question[field]) {
      for (const lang of VALIDATION_CONFIG.required_languages) {
        if (!question[field][lang]) {
          errors.push(`${field}.${lang} 字段缺失或为空`)
        } else if (typeof question[field][lang] !== 'string' || question[field][lang].trim() === '') {
          errors.push(`${field}.${lang} 必须是非空字符串`)
        }
      }
    }
  }

  // 验证标签
  if (question.tags) {
    if (!Array.isArray(question.tags)) {
      errors.push('标签字段必须是数组')
    } else if (question.tags.length === 0) {
      warnings.push('建议至少添加一个标签')
    } else {
      question.tags.forEach((tag, tagIndex) => {
        if (typeof tag !== 'string' || tag.trim() === '') {
          errors.push(`标签[${tagIndex}]必须是非空字符串`)
        }
      })
    }
  }

  // 检查重复ID（需要在全局层面检查）

  // 内容质量检查
  if (question.question && question.question.zh && question.question.zh.length < 5) {
    warnings.push('中文问题内容过短，建议至少5个字符')
  }
  
  if (question.answer && question.answer.zh && question.answer.zh.length < 20) {
    warnings.push('中文答案内容过短，建议至少20个字符')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    questionIndex: index,
    filename
  }
}

/**
 * 加载并验证问题文件
 */
function validateFile(filePath) {
  console.log(`\n🔍 验证文件: ${filePath}`)
  
  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // 尝试解析为模块
    const tempFile = filePath.replace('.ts', '.temp.js')
    const jsContent = fileContent
      .replace(/import.*from.*['"].*['"];?\s*/g, '') // 移除import语句
      .replace(/export\s+(const|let|var)\s+/g, '') // 移除export关键字
      .replace(/:\s*Question\[\]/g, '') // 移除TypeScript类型注解
    
    fs.writeFileSync(tempFile, `module.exports = ${jsContent.match(/\[[\s\S]*\]/)[0]}`, 'utf8')
    
    // 加载问题数据
    delete require.cache[require.resolve(tempFile)]
    const questions = require(tempFile)
    
    // 清理临时文件
    fs.unlinkSync(tempFile)
    
    console.log(`📊 找到 ${questions.length} 个问题`)
    
    // 验证每个问题
    const fileResults = {
      filename: path.basename(filePath),
      total: questions.length,
      passed: 0,
      failed: 0,
      warnings: 0,
      issues: []
    }

    questions.forEach((question, index) => {
      const result = validateQuestion(question, index, path.basename(filePath))
      
      if (result.valid) {
        fileResults.passed++
      } else {
        fileResults.failed++
        fileResults.issues.push(result)
      }
      
      fileResults.warnings += result.warnings.length
      validationResults.total++
      
      if (result.valid) {
        validationResults.passed++
      } else {
        validationResults.failed++
        validationResults.errors.push(result)
      }
      
      validationResults.warnings += result.warnings.length
    })

    // 显示文件验证结果
    console.log(`✅ 通过: ${fileResults.passed}`)
    console.log(`❌ 失败: ${fileResults.failed}`)
    console.log(`⚠️  警告: ${fileResults.warnings}`)

    if (fileResults.issues.length > 0) {
      console.log('\n🐛 发现的问题：')
      fileResults.issues.forEach(issue => {
        console.log(`\n   问题 #${issue.questionIndex + 1}:`)
        issue.errors.forEach(error => {
          console.log(`   ❌ ${error}`)
        })
        issue.warnings.forEach(warning => {
          console.log(`   ⚠️  ${warning}`)
        })
      })
    }

    return fileResults

  } catch (error) {
    console.error(`❌ 文件验证失败: ${error.message}`)
    return null
  }
}

/**
 * 检查ID重复
 */
function checkDuplicateIds(allQuestions) {
  const idMap = new Map()
  const duplicates = []

  allQuestions.forEach((question, index) => {
    if (question.id) {
      if (idMap.has(question.id)) {
        duplicates.push({
          id: question.id,
          locations: [idMap.get(question.id), { index, filename: question._filename }]
        })
      } else {
        idMap.set(question.id, { index, filename: question._filename })
      }
    }
  })

  if (duplicates.length > 0) {
    console.log('\n🚫 发现重复ID：')
    duplicates.forEach(dup => {
      console.log(`   ID: ${dup.id}`)
      dup.locations.forEach(loc => {
        console.log(`     - ${loc.filename}:${loc.index + 1}`)
      })
    })
  }

  return duplicates
}

/**
 * 主验证函数
 */
async function validateAllQuestions() {
  console.log('🎯 IT面试问题数据验证器')
  console.log('=' .repeat(50))

  const questionsDir = path.join(__dirname, '../data/questions')
  const technicalDir = path.join(questionsDir, 'technical')
  
  // 要验证的文件列表
  const filesToValidate = [
    path.join(questionsDir, 'general.ts'),
    path.join(questionsDir, 'japan-specific.ts'),
    path.join(technicalDir, 'java.ts'),
    path.join(technicalDir, 'frontend.ts')
  ]

  // 验证每个文件
  const allQuestions = []
  for (const filePath of filesToValidate) {
    if (fs.existsSync(filePath)) {
      const result = validateFile(filePath)
      if (result) {
        // 这里可以添加更多处理逻辑
      }
    } else {
      console.log(`⚠️  文件不存在: ${filePath}`)
    }
  }

  // 显示总体结果
  console.log('\n' + '=' .repeat(50))
  console.log('📈 验证总结')
  console.log('=' .repeat(50))
  console.log(`总问题数: ${validationResults.total}`)
  console.log(`✅ 通过: ${validationResults.passed}`)
  console.log(`❌ 失败: ${validationResults.failed}`)
  console.log(`⚠️  警告: ${validationResults.warnings}`)

  if (validationResults.failed === 0) {
    console.log('\n🎉 所有问题验证通过！')
  } else {
    console.log(`\n💥 ${validationResults.failed} 个问题需要修复`)
  }

  return validationResults.failed === 0
}

// 运行验证
if (require.main === module) {
  validateAllQuestions()
    .then((success) => {
      process.exit(success ? 0 : 1)
    })
    .catch((error) => {
      console.error('❌ 验证过程出错:', error)
      process.exit(1)
    })
}

module.exports = { validateQuestion, validateFile, validateAllQuestions } 