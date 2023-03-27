const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
// const { authenticateToken } = require('../middleware')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const maxAge = 3 * 224 * 60 * 60
function generateAccessToken (user) {
  user = Object.assign({}, user)
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge
  })
}

// register
router.post('/register', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (user) {
    res.json({ bool: true, message: 'User Already exists' })
  }

  try {
    // generate new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      confirmpassword: req.body.confirmpassword,
      phone: req.body.phone,
      isGuide: req.body.isGuide
    })
    // save user and respond
    const user = newUser.save()
    res.status(200).json({ user, bool: false })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    // !user && res.status(404).send("user not found")
    if (!user) {
      return res.json({ bool: true, message: 'user not found' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    // if password is not valid

    // !validPassword && res.status(400).json("wrong password")
    if (!validPassword) {
      return res.json({ bool: true, message: 'wrong password' })
    }
    // if password is  valid

    const accessToken = generateAccessToken(user)
    res.cookie('jwt', accessToken, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000
    })
    res.status(200).json({ accessToken, bool: false })
  } catch (err) {
    console.log(err, 'err in catch of auth.js1')
    // const errors=handleErrors(err)
    // console.log(errors,'err in catch of auth.js3');
    // res.json({errors,created:false})
  }
})

router.post('/forgotpassword', async (req, res) => {
  const phoneNumber = req.body.phone.substring(3)
  const Phone = parseInt(phoneNumber)
  const user = await User.findOne({ phone: Phone })
  if (!user) {
    return res.json({ userexist: false, message: 'User Not Found' })
  }

  res.status(200).json({ userexist: true })
})

router.post('/googlesignin', async (req, res) => {
  console.log(req.body, 'req.body of googlesignin')
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    // const createuser=User.
    const newUser = new User({
      username: req.body.username,
      email: req.body.email
    })

    const user = await User.findOne({ email: req.body.email })
    const accessToken = generateAccessToken(user)
    res.cookie('jwt', accessToken, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000
    })
  }
  res.status(200).json({ created: true })
})

module.exports = router
