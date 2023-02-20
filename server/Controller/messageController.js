
const Message = require('../models/Message')

module.exports = {

  addMessage: async (req, res) => {
    const newMessage = new Message(req.body)
    try {
      const saveMessage = await newMessage.save()
      res.status(200).json(saveMessage)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getMessage: async (req, res) => {
    try {
      const messages = await Message.find({
        ConversationId: req.params.conversationId
      })

      res.status(200).json(messages)
    } catch (err) {
      res.status(500).json(err)
    }
  }

}
