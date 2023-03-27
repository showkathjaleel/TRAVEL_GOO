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
      console.log(conversation, 'all conversation of a user')
      res.status(200).json(conversation)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  getSpecificConv: async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.senderuserId, req.params.recieverUserId] }
      })
      // if there is no conversation we want to create it
      if (!conversation) {
        const newConversation = new Conversation({
          members: [req.params.senderuserId, req.params.recieverUserId]
        })
        const savedConversation = await newConversation.save()
        return res.status(200).json(savedConversation)
      }
      console.log(conversation, 'conversation in getSpecificConv')
      res.status(200).json(conversation)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

}
