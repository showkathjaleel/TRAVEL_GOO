const router = require('express').Router()
const { verifyToken } = require('../middleware')
const Comment = require('../models/Comment')

// create comment
router.post('/createcomment', async (req, res) => {
  const newComment = new Comment(req.body)
  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (err) {
    res.status(500).json(err)
  }
},

// get comments
router.get('/getcomments/:id', verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
    res.status(200).json({ comments })
  } catch (err) {
    res.status(500).json(err)
  }
})

)

module.exports = router
