const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
    },
    pinned: { type: Boolean, default: false },
    statuses: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['sent', 'delivered', 'read'],
        },
        timestamp: Date,
      },
    ],
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

messageSchema.index({ chat: 1, createdAt: -1 })

module.exports = mongoose.model('Message', messageSchema)
