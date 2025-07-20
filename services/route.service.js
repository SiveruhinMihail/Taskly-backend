const Post = require('../models/Post')

class PostService {
  static async createPost(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string')
    }

    const post = new Post({ title })
    const savedPost = await post.save()
    return savedPost
  }
}

module.exports = PostService
