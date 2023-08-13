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

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() , success:false});
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ error: "please enter valid credentials",success:false });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(req.body.password,salt)
        // Creating a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data={
        user:{
            id: user.id
        }
      }

      const authtoken = jwt.sign(data,JWT_SECRET);

      res.json({authtoken,success:true})

    } catch (error) {
      res.send("Internal Server Error");
    }
  }
);


// LOGIN

router.post("/login",
[
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a valid password").isLength({ min: 5 }),
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const {email,password}=req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.json({ error: "please enter valid credentials" ,success:false });
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.json({ error: "please enter valid credentials",success:false });
        }
        const data={
            user:{
                id: user.id
            }
          }
    
          const authtoken = jwt.sign(data,JWT_SECRET);
    
          res.json({authtoken,success:true})

    } catch (error) {
        res.send("Internal Server Error");
    }

})


module.exports = router;
