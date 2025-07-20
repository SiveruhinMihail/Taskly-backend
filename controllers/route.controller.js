const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
//обработка постов
router.post('/posts', async (req, res) => {
  try {
    const { title } = req.body

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must be a non-empty string',
      })
    }
    //СОЗДАНИЕ НОВОГО ПОСТА
    const newPost = new Post({
      title: title.trim(),
      //- МСТО ДЛЯ ДОП ПОЛЕЙ
    })
    //СОХРАНЕНИЕ ПОСТ В БД
    const savedPost = await newPost.save()
    //УСПЕШНЫЙ ОТВЕТ
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost,
    })
    //ОБРАБОТКА ОШИБОК
  } catch (error) {
    console.error('Error creating post:', error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
})

module.exports = router
