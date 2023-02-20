const router = require('express').Router()
const conversationController = require('../Controller/conversationController')

// new conversation
router.post('/', conversationController.createConveration)

// get conversation of a user
router.get('/getconversation/:id', conversationController.getUserconv)

module.exports = router
