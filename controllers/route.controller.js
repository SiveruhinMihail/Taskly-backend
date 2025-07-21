const PostService = require('../services/route.service')

exports.create = async (req, res) => {
  try {
    const { title } = req.body
    const savedPost = await PostService.createPost(title)

    res.status(200).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost,
    })
  } catch (error) {
    console.error(error.message)
  }
}
