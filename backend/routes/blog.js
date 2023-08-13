const express = require("express");
const User = require("../models/BlogUser");
const Post = require("../models/Post");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
const multer=require('multer');
const uploadMiddle=multer({dest: 'uploads/'});
const fs=require('fs');


dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

// get user details

router.post("/getuser",fetchUser,async (req, res) => {
    try {
    userId=req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    res.send("Internal Server Error");
  }
  })
  
  // create post

  router.post("/post",uploadMiddle.single('file'), async (req,res)=>{
    try {
      const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    const token = req.body.token;
    const info =  jwt.verify(token, JWT_SECRET)
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.user.id,
      comments:[],
      likes:{}
    });
      res.json({postDoc,success:true});
    } catch (error) {
      res.json({success:false});
    }
  })
  
  // update post

  router.put('/post',uploadMiddle.single('file'), async (req,res) => {
    try {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
    const {id,title,summary,content,token} = req.body;
    const info = jwt.verify(token, JWT_SECRET);
    const postDoc = await Post.findById(id);
    const isAuthor = (JSON.stringify(postDoc.author) === JSON.stringify(info.user.id));
    if (!isAuthor) {
      return res.json({success:false,error:'you are not the author'});
    }
    await Post.findByIdAndUpdate(id,{
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json({success:true});
    } catch (error) {
      res.json({success:false,error});
    }
  });

  // get all blogs

  router.get("/getblogs",async (req,res)=>{
    try {
        const blogs = await Post.find().populate('author',['name']).sort({createdAt: -1});
      res.json({success:true,blogs});
    } catch (error) {
      res.json({success:false,error:"Internal Server Error"})
    }
  })


  //get specific blog
  
  router.get("/getblog/:id",async (req,res)=>{
    try {
      const id=req.params.id;
      const blog = await Post.findById(id).populate('author',['name']);
      res.json({success:true,blog});
    } catch (error) {
      res.json({success:false,error:"Internal Server Error"})
    }
  })
  

  //get user blogs

  router.get("/blogs",fetchUser,async (req,res)=>{
    try {
      const id=req.user.id;
      const blog = await Post.find({author:id}).populate('author',['name']);
      res.json({success:true,blog});
    } catch (error) {
      res.json({success:false,error:"Internal Server Error"})
    }
  })

  //delete blog
  
  router.delete('/deleteblog/:id',fetchUser,async (req,res)=>{
    try {
      const {id}=req.params;
      const info = await Post.findById(id);
      
      if(JSON.stringify(info.author) === JSON.stringify(req.user.id)){
        const blog = await Post.findByIdAndDelete(id);
        res.json({success:true});
      }
      else{
        res.json({success:false});
      }
    } catch (error) {
      res.json({success:false,error:"Internal Server Error"})
    }
  })

  // change password
  
  router.put('/changepass',fetchUser,async (req,res)=>{
    try {
      const {oldPass,NewPass}=req.body;
      const id =req.user.id;
      const user = await User.findById(id);
      if(!(await bcrypt.compare(oldPass,user.password))){
        return res.json({success:false});
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(NewPass,salt);
  
      const NewUser = await User.findByIdAndUpdate(id,{password: secPass});
  
      return res.json({success:true});
  
    } catch (error) {
      res.json({success:false})
    }
  })
  
  // change username

  router.put('/changename',fetchUser,async (req,res)=>{
    try {
      const {newName,pass}=req.body;
      const id =req.user.id;
      const user= await User.findById(id);
      if(await bcrypt.compare(pass,user.password)){
        const NewUser = await User.findByIdAndUpdate(id,{name: newName});
        return res.json({success:true});
      }
      else{
        return res.json({success:false});
      }
  
    } catch (error) {
      return res.json({success:false,error:"Internal Server Error"})
    }
  })
  

  // comment

  router.put('/comment/:id',fetchUser,async(req,res)=>{
    try{
      const {id} = req.params
      const {comment}=req.body;
      const info = await Post.findById(id);
      let comms=info.comments;
      const user = await User.findById(req.user.id);
      comms.push({comment,name:user.name,avatar:user.Avatar});
      const post= await Post.findByIdAndUpdate(id,{comments:comms});
      return res.json({success:true});
    } catch (error) {
      return res.json({success:false,error})
    }
  })
  
  // is Liked ?

  router.put('/isliked/:id', fetchUser, async (req, res) => {
    try {
        const { id } = req.params;
        const  userId  = req.user.id;
        const post = await Post.findById(id);
        let like;
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
            like=false;
        } else {
            post.likes.set(userId, true);
            like=true;
        }
        const updatedPost = await Post.findByIdAndUpdate(id,{ 
            likes: post.likes
        });
  
        return res.json({success:true,like,likes:post.likes.size});
    } catch (err) {
        return res.json({success:false,error:err});
    }
  })
  

  // likes 

  router.get('/likes/:id', fetchUser, async (req, res) => {
    try {
        const { id } = req.params;
        const  userId  = req.user.id;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        return res.json({success:true,isLiked,likes:post.likes.size});
    } catch (err) {
        res.json({success:false,error:err});
    }
  })
  

  // set avatar

  router.post('/setavatar',fetchUser,async (req,res) =>{
    try {
        const userId = req.user.id;
        const avatarIMG = req.body.image;
        const user= await User.findByIdAndUpdate(userId,{
            isAvatarSet: true,
            Avatar: avatarIMG
        })
        return res.json({isSet:true,image:avatarIMG})
    } catch (error) {
        res.json({isSet:false,error});
    }
  })
  
  // get comments

  router.get('/getcomments/:id',async(req,res)=>{
    try{
      const id = req.params.id;
      const info = await Post.findById(id);
      let comms=info.comments;
      res.json({success:true,comms});
    } catch (error) {
      res.json({success:false,error:"Internal Server Error"})
    }
  })
  

module.exports = router;
