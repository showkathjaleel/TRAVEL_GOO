const router = require('express').Router()
const postController = require('../Controller/postController')

const multer = require('multer')
const { verifyToken } = require('../middleware')
const storage = multer.memoryStorage()
const upload = multer({ storage })

// create a post
router.post('/createPost', upload.single('image'), postController.createPost)
// update a post
router.put('/updatePost/:id', postController.updatePost)

// delete a post
router.post('/deletePost/:id', postController.deletePost)

// like a post
router.put('/likePost/:id', verifyToken, postController.likePost)

// get a post
router.get('/getPost/:id', postController.getPost)

// save a post
router.post('/save/:id', postController.savePost)

// getSaved Posts
router.get('/savedposts/:userId', postController.getSavedPosts)

// get timeline to show all the  posts in home page
router.get('/timelinePost/:userId', postController.timelinePost)

// get all Posts //ith upayogichittilla
router.get('/getallposts', verifyToken, postController.getAllPosts)

router.get('/profile/:userId', verifyToken, postController.getProfile)

module.exports = router
