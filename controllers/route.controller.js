const express = require('express')
const router = express.Router()
const PostService = require('./route.service')

router.post('/posts', async (req, res) => {
  try {
    const { title } = req.body
    const savedPost = await PostService.createPost(title)

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost,
    })
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = router
