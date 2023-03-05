
const mongoose = require('mongoose')

const storySchema = new mongoose.Schema(
  {
    url: { type: String },
    type: { type: String },
    header: { type: Object }
  },
  { timestamps: true }
)

const story = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    stories: { type: [storySchema] },
    date: Date
  }
)

module.exports = mongoose.model('Story', story)
