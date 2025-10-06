const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
  {
    name: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    description: String,
  },
  {
    timestamps: true,
  },
)

chatSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'chat',
})

module.exports = mongoose.model('Chat', chatSchema)
