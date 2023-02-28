const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  userRegister: async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.json({ bool: true, message: 'User Already exists' })
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
  },

  userLogin: async (req, res) => {
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
      const token = jwt.sign({ id: user._id },
        process.env.ACCESS_TOKEN_SECRET)
      const { password, ...info } = user._doc
      res.cookie('jwt', token, {
        httpOnly: true
      }).status(200).send(info)
    } catch (err) {
      console.log(err, 'err in catch of auth.js1')
      // const errors=handleErrors(err)
      // console.log(errors,'err in catch of auth.js3');
      // res.json({errors,created:false})
    }
  }
}
