const router = require('express').Router()
const conversationController = require('../Controller/conversationController')

// new conversation
router.post('/', conversationController.createConveration)

// get  all conversation of a user
router.get('/getconversation/:id', conversationController.getUserconv)

// get conversation of currentuser with a specific  user he clicked
// it returns the conversationId
router.get('/getspecificconv/:senderuserId/:recieverUserId', conversationController.getSpecificConv)

module.exports = router
