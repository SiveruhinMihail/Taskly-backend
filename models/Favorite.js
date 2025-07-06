const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

favoriteSchema.index({ post: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Favorite', favoriteSchema)
