const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    characteristics: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likesCount: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    complaintsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

postSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'post',
})

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
})

postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ likesCount: -1 })

module.exports = mongoose.model('Post', postSchema)
