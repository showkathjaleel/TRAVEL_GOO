const Conversation = require('../models/Conversation')

module.exports = {

  createConveration: async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId]
    })

    try {
      const savedConversation = await newConversation.save()
      res.status(200).json(savedConversation)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getUserconv: async (req, res) => {
    try {
      const userId = req.params.id
      const conversation = await Conversation.find({
        members: { $in: [userId] }
      })
      res.status(200).json(conversation)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

}
