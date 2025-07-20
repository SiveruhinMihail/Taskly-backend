const express = require('express')
const router = express.Router()
const PostService = require('./route.service')

// обработка постов
router.post('/posts', async (req, res) => {
  try {
    const { title } = req.body
    const savedPost = await PostService.createPost(title)

    // УСПЕШНЫЙ ОТВЕТ
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost,
    })
  } catch (error) {
    console.error('Error creating post:', error)

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      })
    }

    if (error.message === 'Title is required and must be a non-empty string') {
      return res.status(400).json({
        success: false,
        message: error.message,
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
