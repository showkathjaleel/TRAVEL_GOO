const Post = require('../models/Post')
const User = require('../models/User')

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} = require('@aws-sdk/client-s3')
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

module.exports = {
  createPost: async (req, res) => {
    console.log('444444444444444444444444444444444444444444444444444444444')
    console.log(req.file, 'req.filewwwwwwwwwwwwwwwwwwwwwwwwww')
    console.log(req.body, 'req.body')

    // -------------------------------------------------------------------------------------------S3 BUCKET
    if (req.file) {
      // Create a hash of the image name using the sha1 algorithm
      //  const hash = crypto.createHash('sha1').update(file.originalname).digest('hex');
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString('hex')
      const buffer = await sharp(req.file.buffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer()
      console.log(buffer, 'buffer000000000000000000000000000000')
      const imageName = randomImageName()

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype
      }
      const command = new PutObjectCommand(params)
      console.log(command, 'command111111111111111111111111111111111111111111111111111111')
      await s3.send(command)
      req.body.img = imageName
    }
    // -------------------------------------------------------------------------------------------

    const newPost = new Post(req.body)
    try {
      const savedPost = await newPost.save()
      res.status(200).json(savedPost)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (post.userId === req.body.userId) {
        await post.updateOne({
          $set: req.body
        })
        res.status(200).json('post has been updated')
      } else {
        res.status(403).json('you can update only your post')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },

  deletePost: async (req, res) => {
    // try {
    const post = await Post.findById(req.params.id)
    console.log('respo222222')

    if (post.userId === req.body.userId) {
      const params = {
        Bucket: bucketName,
        Key: post.img
      }

      const command = new DeleteObjectCommand(params)
      console.log(command, 'command')
      const res = await s3.send(command)
      console.log(res, 'resssss')
      await post.deleteOne()
      res.status(200).json('post has been deleted')
    } else {
      res.status(403).json('you can delete only your post')
    }
    // } catch (err) {
    //   res.status(500).json(err)
    // }
  },

  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } })
        res.status(200).json('post has been liked')
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } })
        res.status(200).json('post has been disliked')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // putComment:async(req,res)=>{

  //     try{
  //     const post=await Post.findById(req.params.id)

  //     if(!post.comments.includes(req.body.userId)){

  //        await post.updateOne({$push:{comments:req.body.userId}})
  //        res.status(200).json({comments:post.comments})
  //     }else{
  //         await post.updateOne({$pull:{comments:req.body.userId}})
  //         res.status(200).json("post has been disliked")
  //     }
  // }catch(err){
  //     res.status(500).json(err)
  // }
  // },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      console.log(post, 'post..........................')
      res.status(200).json(post)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  timelinePost: async (req, res) => {
    const postArray = []
    try {
      const currentUser = await User.findById(req.params.userId)

      const userPosts = await Post.find({ userId: currentUser._id })
      //  ____________________________________________________________________________________

      userPosts.forEach((post) => {
        if (post.img) {
          const getObjectParams = {
            Bucket: bucketName,
            Key: post.img
          }
          console.log(getObjectParams, '22222222222222222222')
          const command = new GetObjectCommand(getObjectParams)
          console.log(command, '33333333333333333333333333')
          getSignedUrl(s3, command, { expiresIn: 3600 }).then((url) => {
            console.log(url, '4444444444444444')
            post.img = url
          })
        }
      })

      //  ____________________________________________________________________________________

      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId })
        })
      )

      //  ____________________________________________________________________________________

      friendPosts.forEach((docArray) => {
        docArray.forEach((post) => {
          if (post.img) {
            const getObjectParams = {
              Bucket: bucketName,
              Key: post.img
            }
            const command2 = new GetObjectCommand(getObjectParams)
            getSignedUrl(s3, command2, { expiresIn: 3600 }).then((url) => {
              post.img = url
            })
          }
        })
      })

      //  ____________________________________________________________________________________

      // ***************************************************************************
      // const friendsLikedPosts=await Promise.all(
      //     friendPosts.forEach(docArray => {
      //         docArray.likes.map((postId) => {
      //             console.log(postId,'oooooooooo');
      //             return Post.findById(postId);
      //         })
      //     })

      // )
      //  console.log(friendsLikedPosts,'ppppppppppppppppppppppppppppppp');

      // ***************************************************************************

      res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ userId: req.params.userId })

      //  ____________________________________________________________________________________
      for (const post of posts) {
        if (post.img) {
          const getObjectParams = {
            Bucket: bucketName,
            Key: post.img
          }

          const command = new GetObjectCommand(getObjectParams)
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
          post.img = url
        }
      }
      //  ____________________________________________________________________________________

      res.status(200).json(posts)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // save a post
  savePost: async (req, res) => {
    try {
      const user = await User.findById(req.body.userId)

      if (!user.savedPosts.includes(req.params.id)) {
        await user.updateOne(
          { $push: { savedPosts: req.params.id } },
          { upsert: true }
        )
        res.status(200).json('post has been saved')
      } else {
        await user.updateOne(
          { $pull: { savedPosts: req.params.id } },
          { upsert: true }
        )
        res.status(200).json('post has been removed from saved posts')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // get saved posts
  getSavedPosts: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)

      const savedPosts = await Promise.all(
        user.savedPosts.map((postId) => {
          return Post.findById(postId)
        })
      )

      //  ____________________________________________________________________________________
      for (const post of savedPosts) {
        if (post.img) {
          const getObjectParams = {
            Bucket: bucketName,
            Key: post.img
          }

          const command = new GetObjectCommand(getObjectParams)
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
          post.img = url
        }
      }
      //  ____________________________________________________________________________________

      if (!savedPosts) {
        return res.status(403).json('No saved posts')
      }
      res.status(200).json({ savedPosts })
    } catch (err) {
      console.log(err)
    }
  },

  getAllPosts: async (req, res) => {
    const posts = await Post.find({})

    for (const post of posts) {
      if (post.img) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: post.img
        }

        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        post.img = url
      }
    }
    res.status(200).json({ posts })
  }
}
