const userController = require('../Controller/userController')
const router = require('express').Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
// const upload = multer({ dest: 'uploads/' })

router.put('/updateUser/:id', upload.single('image'), userController.updateUser)

router.delete('/deleteUser/:id', userController.deleteUser)

//  router.get('/getUser',userController.getUser)
router.get('/getUser/:id', userController.getUser)

router.put('/followUser/:id', userController.followUser)

router.put('/unfollowUser/:id', userController.unfollowUser)

// delete profilePicture
router.post('/deleteProfileImg', userController.deleteProfileImg)

// get friends
router.get('/friends/:id', userController.getFriends)

router.post('/refresh', userController.refresh)

router.post('/logout', userController.logout)

module.exports = router

//  /api/getUser?userId='+friendId

// const router=require('express').Router();
// const User=require("../models/User")
// const bcrypt=require('bcrypt');
// const { findById } = require('../models/User');

// //update user
// //also checks wheather its admin or not
// router.put('/updateUser/:id',async(req,res)=>{

//   if(req.body.userId===req.params.id || req.body.isAdmin){
//     console.log("keri");
//     if(req.body.password){

//       try{
//         const salt=await bcrypt.genSalt(10);
//         req.body.password=await bcrypt.hash(req.body.password,salt)
//       }catch(err){
//         return res.status(500).json(err)
//       }

//     }

//     try{

//       const user=await User.findByIdAndUpdate(req.params.id,
//         {$set:req.body
//         });
//         res.status(200).json("account has updated")
//     }catch(err){
//     return res.status(500).json(err);
//     }

//   }else{
//     return res.status(403).json("you can update only your account")
//   }
// })

// //delete user
// router.delete('/deleteUser/:id',async(req,res)=>{
//  console.log(req.body.userId);
//  console.log(req.params.id);
//   if(req.body.userId===req.params.id || req.body.isAdmin){

//    try{
//     console.log("keri");
//       const user=await User.findByIdAndDelete(req.params.id);
//         res.status(200).json("account has deleted")
//     }catch(err){
//     return res.status(500).json(err);
//     }

//   }else{
//     return res.status(403).json("you can delete only your account")
//   }
// })

// //get a user

// router.get('/getUser/:id',async(req,res)=>{
//   try{
//     console.log(req.params.id);
//     console.log("keri");
//   const user=await User.findById(req.params.id)
//   const {password,updatedAt,createdAt,...others}=user._doc;
//   res.status(200).json(others)
// }catch(err){
//   res.status(500).json(err)
// }
// })

// //follow a user
// router.put('/followUser/:id',async(req,res)=>{

//    if(req.body.userId !== req.params.id){       //check wheather the users are same

//     try{
//      console.log("keri 1");
//        const user=await User.findById(req.params.id);
//        console.log(user);
//        console.log("{{{{{{{{");
//        const currentUser=await User.findById(req.body.userId);
//        console.log(currentUser);

// if(!user.followers.includes(req.body.userId)){
//   console.log("keri 2");       //if current user is not following this user
//  await user.updateOne({$push:{followers:req.body.userId}})
//  await currentUser.updateOne({$push:{following:req.params.id}})
//  res.status(200).json("user has been followed")
// }else{
//   res.status(403).json("you already follow this user")
// }

//      }catch(err){
//      return res.status(500).json(err);
//      }

//    }else{
//      return res.status(403).json("you can't follow yourself")
//    }
//  })

// //unfollow a user
// router.put('/unfollowUser/:id',async(req,res)=>{

//    if(req.body.userId !== req.params.id){       //check wheather the users are same

//     try{
//      console.log("keri 1");
//        const user=await User.findById(req.params.id);
//        console.log(user);
//        console.log("{{{{{{{{");
//        const currentUser=await User.findById(req.body.userId);
//        console.log(currentUser);

// if(!user.followers.includes(req.body.userId)){
//   console.log("keri 2");       //if current user is not following this user
//  await user.updateOne({$pull:{followers:req.body.userId}})
//  await currentUser.updateOne({$pull:{following:req.params.id}})
//  res.status(200).json("user has been unfollowed")
// }else{
//   res.status(403).json("you dont follow this user")
// }

//      }catch(err){
//      return res.status(500).json(err);
//      }

//    }else{
//      return res.status(403).json("you can't unfollow yourself")
//    }
//  })
