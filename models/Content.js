const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['text', 'image', 'video', 'file', 'mixed'],
      required: true,
    },
    text: String,
    media: [
      {
        url: String,
        thumbnail: String,
        dimensions: {
          width: Number,
          height: Number,
        },
      },
    ],
    metadata: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
)

contentSchema.virtual('post', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'content',
})

contentSchema.virtual('message', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'content',
})

module.exports = mongoose.model('Content', contentSchema)
