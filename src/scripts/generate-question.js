#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 创建命令行界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 问题模板
const TEMPLATES = {
  general: {
    subcategories: ['self-intro', 'strengths-weaknesses', 'career-goals', 'motivation'],
    template: `{
  id: '{id}',
  category: 'general',
  subcategory: '{subcategory}',
  question: {
    zh: '{question_zh}',
    ja: '{question_ja}'
  },
  answer: {
    zh: '{answer_zh}',
    ja: '{answer_ja}'
  },
  tags: [{tags}],
  difficulty: '{difficulty}'
}`
  },
  'japan-specific': {
    template: `{
  id: '{id}',
  category: 'japan-specific',
  question: {
    zh: '{question_zh}',
    ja: '{question_ja}'
  },
  answer: {
    zh: '{answer_zh}',
    ja: '{answer_ja}'
  },
  tags: [{tags}],
  difficulty: '{difficulty}'
}`
  },
  technical: {
    subcategories: ['java', 'frontend', 'backend', 'database', 'cloud', 'system-design', 'devops', 'security', 'algorithms'],
    template: `{
  id: '{id}',
  category: 'technical',
  subcategory: '{subcategory}',
  question: {
    zh: '{question_zh}',
    ja: '{question_ja}'
  },
  answer: {
    zh: '{answer_zh}',
    ja: '{answer_ja}'
  },
  tags: [{tags}],
  difficulty: '{difficulty}'
}`
  }
}

// 辅助函数
function generateId(category, subcategory) {
  const timestamp = Date.now()
  const randomSuffix = Math.random().toString(36).substr(2, 5)
  return subcategory 
    ? `${category}-${subcategory}-${timestamp.toString().slice(-6)}-${randomSuffix}`
    : `${category}-${timestamp.toString().slice(-6)}-${randomSuffix}`
}

function formatTags(tagsString) {
  return tagsString.split(',').map(tag => `'${tag.trim()}'`).join(', ')
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

// 主要的问题生成逻辑
async function generateQuestion() {
  console.log('🎯 IT面试问题生成器')
  console.log('=' .repeat(50))

  try {
    // 选择分类
    const category = await askQuestion(`
请选择问题分类：
1. general (通用面试问题)
2. japan-specific (日本企业特色问题)  
3. technical (技术面试问题)

输入选择 (1-3): `)

    const categoryMap = { '1': 'general', '2': 'japan-specific', '3': 'technical' }
    const selectedCategory = categoryMap[category]

    if (!selectedCategory) {
      console.log('❌ 无效的分类选择')
      return
    }

    let subcategory = ''
    if (TEMPLATES[selectedCategory].subcategories) {
      console.log(`\n${selectedCategory}的子分类：`)
      TEMPLATES[selectedCategory].subcategories.forEach((sub, index) => {
        console.log(`${index + 1}. ${sub}`)
      })
      
      const subIndex = await askQuestion('\n请选择子分类编号: ')
      subcategory = TEMPLATES[selectedCategory].subcategories[parseInt(subIndex) - 1]
      
      if (!subcategory) {
        console.log('❌ 无效的子分类选择')
        return
      }
    }

    // 收集问题信息
    console.log('\n📝 请输入问题信息：')
    const questionZh = await askQuestion('中文问题: ')
    const questionJa = await askQuestion('日语问题: ')
    const answerZh = await askQuestion('中文答案: ')
    const answerJa = await askQuestion('日语答案: ')
    const tagsInput = await askQuestion('标签 (用逗号分隔): ')
    const difficulty = await askQuestion('难度 (easy/medium/hard): ')

    // 验证输入
    if (!questionZh || !questionJa || !answerZh || !answerJa || !tagsInput || !difficulty) {
      console.log('❌ 所有字段都是必填的')
      return
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      console.log('❌ 难度必须是 easy、medium 或 hard')
      return
    }

    // 生成问题对象
    const id = generateId(selectedCategory, subcategory)
    const tags = formatTags(tagsInput)
    
    let questionCode = TEMPLATES[selectedCategory].template
      .replace('{id}', id)
      .replace('{question_zh}', questionZh)
      .replace('{question_ja}', questionJa)
      .replace('{answer_zh}', answerZh)
      .replace('{answer_ja}', answerJa)
      .replace('{tags}', tags)
      .replace('{difficulty}', difficulty)

    if (subcategory) {
      questionCode = questionCode.replace('{subcategory}', subcategory)
    }

    // 显示生成的问题
    console.log('\n✅ 生成的问题代码：')
    console.log('=' .repeat(50))
    console.log(questionCode)
    console.log('=' .repeat(50))

    // 询问是否保存
    const saveChoice = await askQuestion('\n是否要保存到文件？(y/N): ')
    
    if (saveChoice.toLowerCase() === 'y') {
      await saveQuestionToFile(selectedCategory, subcategory, questionCode, id)
    }

    // 询问是否继续
    const continueChoice = await askQuestion('\n是否要继续添加问题？(y/N): ')
    if (continueChoice.toLowerCase() === 'y') {
      await generateQuestion()
    }

  } catch (error) {
    console.error('❌ 发生错误:', error.message)
  }
}

// 保存问题到文件
async function saveQuestionToFile(category, subcategory, questionCode, id) {
  try {
    let filePath = ''
    
    if (category === 'technical') {
      filePath = path.join(__dirname, '../data/questions/technical', `${subcategory}.ts`)
    } else {
      filePath = path.join(__dirname, '../data/questions', `${category}.ts`)
    }

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`❌ 文件不存在: ${filePath}`)
      return
    }

    // 读取现有文件内容
    let fileContent = fs.readFileSync(filePath, 'utf8')
    
    // 在数组末尾添加新问题（在最后一个 ] 之前）
    const insertPosition = fileContent.lastIndexOf(']')
    if (insertPosition === -1) {
      console.log('❌ 无法找到数组结束位置')
      return
    }

    // 检查是否需要添加逗号
    const beforeInsert = fileContent.substring(0, insertPosition).trim()
    const needsComma = !beforeInsert.endsWith('[') && !beforeInsert.endsWith(',')
    
    const newQuestionWithComma = (needsComma ? ',\n' : '\n') + questionCode
    
    const newContent = fileContent.substring(0, insertPosition) + 
                      newQuestionWithComma + '\n' + 
                      fileContent.substring(insertPosition)

    // 写入文件
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`✅ 问题已保存到: ${filePath}`)
    console.log(`   问题ID: ${id}`)

  } catch (error) {
    console.error('❌ 保存文件时出错:', error.message)
  }
}

// 启动脚本
console.log('欢迎使用IT面试问题生成器！')
generateQuestion().then(() => {
  rl.close()
  console.log('\n👋 再见！')
}).catch((error) => {
  console.error('❌ 程序异常:', error)
  rl.close()
}) 