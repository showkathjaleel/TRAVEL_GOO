
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { putImagestoS3 } = require('../tools/s3')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
// const { putObjectCommand } = require('@aws-sdk/client-s3')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const crypto = require('crypto')
const sharp = require('sharp')

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey
  },
  region: bucketRegion
})

// update user
// also checks wheather its admin or not

module.exports = {

  updateUser: async (req, res) => {
    console.log('req.body in updateuser', req.body)
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
          return res.status(500).json(err)
        }
      }

      if (req.file) {
        // if (req.body.data === 'profilePicture') {
        //   const file = req.file
        //   putImagestoS3(file).then(async (imageName) => {
        //     const user = await User.findByIdAndUpdate(req.params.id,
        //       {
        //         $set: { ProfilePicture: imageName }
        //       })
        //     return res.status(200).json({ user })
        //   })
        // }
        // else if (req.body.data === 'coverPicture') {
        //   console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')

        //   const file = req.file

        //   const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
        //   const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: 'contain' }).toBuffer()
        //   const imageName = randomImageName()

        //   const params = {
        //     Bucket: bucketName,
        //     Key: imageName,
        //     Body: buffer,
        //     ContentType: req.file.mimetype
        //   }

        //   console.log('params', params)

        //   const command = new PutObjectCommand(params)
        //   console.log('command', command)

        //   const response = await s3.send(command)
        //   console.log('response', response)

        //   const user = await User.findByIdAndUpdate(req.params.id,
        //     {
        //       $set: { CoverPicture: imageName }
        //     })
        //   return res.status(200).json({ user })
        // }
      }

      // ======================================================================================
      try {
        const user = await User.findByIdAndUpdate(req.params.id,
          {
            $set: req.body
          })

        // --------------------------------------------------------------------------

        // const updateduser = await User.findById(req.body.userId)
        // const maxAge = 3 * 224 * 60 * 60
        // function generateAccessToken (user) {
        //   user = Object.assign({}, user)
        //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //     expiresIn: maxAge
        //   })
        // }

        // const accessToken = generateAccessToken(updateduser)
        // res.status(200).json({ accessToken })
        res.status(200).json({ user })

        // --------------------------------------------------------------------------
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(403).json('you can update only your account')
    }
  },

  refresh: async (req, res) => {
    console.log(req.body)
    const updateduser = await User.findById(req.body.userId)
    const maxAge = 3 * 224 * 60 * 60
    function generateAccessToken (user) {
      user = Object.assign({}, user)
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
      })
    }

    const accessToken = generateAccessToken(updateduser)
    console.log(accessToken, 'jwt')
    res.cookie('jwt', accessToken, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000
    })
    res.status(200).json({ accessToken })
  },

  // ------------------------------------------------------------------------------------------------------------------------//

  // delete user
  deleteUser: async (req, res) => {
    // this req.userId is coming from the jwt verify middleware
    // if (req.userId !== user._id.toString()) {
    //   return res.status(403).send("you can delete only your account!")
    // }

    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json('account has deleted')
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(403).json('you can delete only your account')
    }
  },

  // ------------------------------------------------------------------------------------------------------------------------//
  // get a user

  getUser: async (req, res) => {
    console.log('getUser il keriiiiiiiii', req.params.id)

    try {
      const user = await User.findById(req.params.id)

      //  ____________________________________________________________________________________
      // for (const post of posts) {
      if (user.ProfilePicture) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: user.ProfilePicture
        }

        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        user.ProfilePicture = url
      }

      if (user.CoverPicture) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: user.CoverPicture
        }

        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        user.CoverPicture = url
      }

      // }
      //  ____________________________________________________________________________________
      const { password, updatedAt, createdAt, ...others } = user._doc
      res.status(200).json(others)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // getUser:async(req,res)=>{

  //   const userId=req.query.userId;
  //    const username=req.query.username

  //   try{
  //    const user=userId
  //    ? await User.findById(userId)
  //    : await User.findOne({username:username})
  //   // const user=await User.findById(req.params.id)
  //   const {password,updatedAt,createdAt,...others}=user._doc;
  //   res.status(200).json(others)
  // }catch(err){
  //   res.status(500).json(err)
  // }
  // },

  // ------------------------------------------------------------------------------------------------------------------------//
  // follow a user
  followUser: async (req, res) => {
    if (req.body.currentuser !== req.params.id) { // check wheather the users are same
      try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.currentuser)
        if (!user.followers.includes(req.body.currentuser)) {
          // if current user is not following this user
          await user.updateOne({ $push: { followers: req.body.currentuser } })
          await currentUser.updateOne({ $push: { following: req.params.id } })
          // res.status(200).json('user has been followed')
          const updatedUser = await User.findById(req.params.id)
          res.status(200).json({ updatedUser })
        } else {
          res.status(403).json('you already follow this user')
        }
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(403).json("you can't follow yourself")
    }
  },

  // ------------------------------------------------------------------------------------------------------------------------//
  // unfollow a user
  unfollowUser: async (req, res) => {
    if (req.body.userId !== req.params.id) { // check wheather the users are same
      try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if (user.followers.includes(req.body.userId)) {
          // if current user is not following this user
          await user.updateOne({ $pull: { followers: req.body.userId } })
          await currentUser.updateOne({ $pull: { following: req.params.id } })
          res.status(200).json('user has been unfollowed')
        } else {
          res.status(403).json('you dont follow this user')
        }
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(403).json("you can't unfollow yourself")
    }
  },

  getFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId)
        })
      )

      const friendList = []
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend
        friendList.push({ _id, username, profilePicture })
      })

      res.status(200).json({ friendList })
    } catch (err) {
      res.status(500).json({ err })
      console.log(err)
    }
  },

  // -----------------------------------------------------------
  logout: async (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({ msg: 'logout successfully' })
  },

  // ------------------------------------------------------------
  deleteProfileImg: async (req, res) => {
    console.log(req.body, '111111111111111111111111')
    const user = await User.findById(req.body.userId)
    console.log('22222222222222222222222222222222')
    const params = {
      Bucket: bucketName,
      Key: user.ProfilePicture
    }
    console.log(params, '444444444444444444444444444444')

    const command = new DeleteObjectCommand(params)
    console.log(command, '555555555555555555555555')
    const response = await s3.send(command)
    console.log(response, '6666666666666666666666')

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    imageName = url
    const ImgDeletedUser = await User.findByIdAndUpdate(req.body.userId,
      {
        $unset: { ProfilePicture: imageName }
      })
    return res.status(200).json({ ImgDeletedUser })
  }
}

module.exports.updateProfilePicture = async (req, res) => {
  if (req.file) {
    putImagestoS3(req.file).then(async (imageName) => {
      console.log(imageName, 'imageName')
      const user = await User.findByIdAndUpdate(req.params.id,
        {
          $set: { ProfilePicture: imageName }
        })
      return res.status(200).json({ user })
    })
  }
}

module.exports.updateCoverPicture = async (req, res) => {
  if (req.file) {
    putImagestoS3(req.file).then(async (imageName) => {
      console.log(imageName, 'imageName')
      const user = await User.findByIdAndUpdate(req.params.id,
        {
          $set: { CoverPicture: imageName }
        })
      console.log(user, 'user in usercontroller')
      return res.status(200).json({ user })
    })
  }
}
