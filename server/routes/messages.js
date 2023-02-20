const router = require('express').Router()
const messageController = require('../Controller/messageController')

// add
router.post('/', messageController.addMessage)

// get all messages from a sender
router.get('/getmessage/:conversationId', messageController.getMessage)
module.exports = router
