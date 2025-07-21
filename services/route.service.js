const Post = require('../models/Post')

class PostService {
  static async createPost(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string')
    }

    const post = new Post({ title })
    await post.save()
    return { success: 'true' }
  }
}

module.exports = PostService
