const express =require('express');
const router = express.Router();
const User =require("../models/User");
const Validator =require("../middlewares/Validator");
const { body, validationResult } = require('express-validator');
const SecurePass =require("../middlewares/SecurePass");
const jsonwebtoken=require('jsonwebtoken');
const bcrypt=require("bcryptjs");
const ValidateToken = require('../middlewares/ValidateToken');
const secret="I am a coder";

//User sign up 

router.post("/createUser",Validator([body("name","Enter a valid name").notEmpty(),
body("email","Enter a valid Email").isEmail(),
body("password","Enter a password greater than 5 characters").isLength({min: 5})]),SecurePass,
async(req,res)=>{
    
  try{
   let user=await User.findOne({email:req.body.email});

   if(user)
    return res.status(400).json({error:"Email is aleady exist"});
    
   let addeduser= await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
   });
   console.log(addeduser);
     const data={
      user:{
         id:addeduser.id
      } 
  }
  const authtoken=jsonwebtoken.sign(data,secret);
  res.status(200).json({msg:"user has been added",token:authtoken});

  } catch(err)
  {
   res.status(500).json({error:"some error occured"});
  } 
 
})

//User Login 

router.post("/login",Validator([body("email","Enter a valid Email").isEmail(),
body("password","Enter a password greater than 5 characters").isLength({min: 5})]),async(req,res)=>{
  
   const {email,password} = req.body;

   try {
      const user= await User.findOne({email:email});
      if(!user) return res.status(400).json({error:"Please enter valid creditials"});

      const checkPass=await bcrypt.compare(password,user.password);
      console.log(checkPass);
      if(!checkPass)  return res.status(400).json({error:"Please enter valid creditials"});
        
      const data={
         user:{
            id:user.id
         } 
     }
     console.log(data);
     const authtoken=jsonwebtoken.sign(data,secret);
    return res.status(200).json({msg:"successfuly logged in",token:authtoken});
   } catch (error) {
       res.status(400).json({error:"internal erro occured"}); 
   }


})

//getUser details

router.post("/getDetails",ValidateToken,async(req,res)=>{
    const id =req.user.id;

     try {
       const user=await User.findById(id).select("-password");
       res.status(200).json({user:user});

     } catch (error) {
      res.status(400).json({error:"internal erro occured"}); 
     }

   
})


module.exports = router;