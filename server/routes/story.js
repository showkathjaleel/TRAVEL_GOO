const router = require('express').Router()
const storyController = require('../Controller/storyController')

router.post('/addStory',storyController.addStory)

module.exports = router
