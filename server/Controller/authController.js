const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const maxAge = 3 * 224 * 60 * 60
function generateAccessToken (userId) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge
  })
}
function generateRefreshToken (userId) {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET)
}
const refreshTokens = []

module.exports = {
  userRegister: async (req, res) => {
    try {
      const {
        username,
        email,
        phone,
        password

      } = req.body
      console.log('user signup il keri', req.body.email, 'maillllllllllllll')
      const userExist = await User.findOne({ email })

      if (userExist) {
        return res.status(400).json({ msg: 'Email already used. ' })
      }

      // generate new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      // create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone
      })
      // save user and respond
      const user = newUser.save()
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      console.log('user login il keriiiiiiiiii', req.body.email)
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist. ' })
      }

      const validPassword = await bcrypt.compare(
        password,
        user.password
      )
      // if password is not valid
      if (!validPassword) {
        return res.status(400).json({ msg: 'Invalid credentials. ' })
      }
      // if password is  valid
      const accessToken = generateAccessToken(user._id)
      const refreshToken = generateRefreshToken(user._id)
      refreshTokens.push(refreshToken)
      // user.refreshToken = refreshToken
      // res.status(200).json({ accessToken, refreshToken })
      console.log('accessToken in  login', accessToken)
      res.status(200).json({ accessToken, refreshToken, userId: user._id })
    } catch (err) {
      console.log(err, 'err in catch of auth.js1')
      res.status(500).json({ error: err.message })
      // const errors=handleErrors(err)
    }
  }
}

module.exports.googleSignIn = async (req, res) => {
  try {
    const { email, username } = req.body
    let user = await User.findOne({ email })
    if (!user) {
    // const createuser=User.
      const newUser = new User({
        username,
        email
      })
      // save user and respond
      user = newUser.save()
    // const user = await User.findOne({ email: req.body.email })
    }
    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
    refreshTokens.push(refreshToken)
    res.status(200).json(accessToken)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports.forgotPassword = async (req, res) => {
  try {
    const phoneNumber = req.body.phone.substring(3)
    const Phone = parseInt(phoneNumber)
    const user = await User.findOne({ phone: Phone })
    if (!user) {
      return res.status(400).json({ msg: 'User Not Found' })
    }
    res.status(200).json({ userexist: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports.otpLogin = async (req, res) => {
  try {
    let { phone } = req.body
    phone = phone.substring(3)
    const phoneNumber = parseInt(phone)
    const user = await User.findOne({ phone: phoneNumber })
    const accessToken = generateAccessToken(user._id)
    console.log(accessToken,'lahdsald')
    const refreshToken = generateRefreshToken(user._id)
    refreshTokens.push(refreshToken)
    res.status(200).json(accessToken)
  } catch (err) {
     console.log(err)
  }
}
