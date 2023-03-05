const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
// const cors = require('cors')

const useRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const messageRoute = require('./routes/messages')
const conversationRoute = require('./routes/conversations')
const paymentRoute = require('./routes/payment')
const tripRoute = require('./routes/trip')
const storyRoute = require('./routes/story')

dotenv.config()

mongoose.connect('mongodb://localhost:27017/newapp', { useNewUrlParser: true }, () => {
  console.log('connected to mongodb')
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
// app.use(cors())

app.use('/api', useRoute)
app.use('/auth', authRoute)
app.use('/posts', postRoute)
app.use('/comment', commentRoute)
app.use('/message', messageRoute)
app.use('/conversation', conversationRoute)
app.use('/payment', paymentRoute)
app.use('/trip', tripRoute)
app.use('/story', storyRoute)

app.listen(5000, () => {
  console.log('server is listening')
})
