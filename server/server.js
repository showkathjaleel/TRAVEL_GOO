const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const messageRoute = require('./routes/messages')
const conversationRoute = require('./routes/conversations')
const paymentRoute = require('./routes/payment')
const tripRoute = require('./routes/trip')
const storyRoute = require('./routes/story')

dotenv.config()

mongoose.connect('mongodb+srv://showkathjaleel456:Showkath123@cluster0.lxbpvk6.mongodb.net/newapp?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {
  console.log('connected to mongodb')
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

app.use('/api/v1/api', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/comment', commentRoute)
app.use('/api/v1/message', messageRoute)
app.use('/api/v1/conversation', conversationRoute)
app.use('/api/v1/payment', paymentRoute)
app.use('/api/v1/trip', tripRoute)
app.use('/api/v1/story', storyRoute)

app.listen(5000, () => {
  console.log('server is listening')
})