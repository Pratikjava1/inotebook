const express =require('express');
const router = express.Router();
const Notes =require("../models/Notes");
const ValidateToken=require("../middlewares/ValidateToken");
const Validator =require("../middlewares/Validator");
const { body, validationResult } = require('express-validator');

//Fetch user notes 

router.get("/fetchallnotes",ValidateToken,async(req,res)=>{
   console.log(req.user);
   const id=req.user.id;
      try {
        const data=await Notes.find({user:id});

        res.status(200).json({notes:data});
      } catch (error) {
        
      }


   
})

//create notes description

router.post("/addnotes",Validator([body("title","Enter the title").notEmpty(),body("description","enter a description").notEmpty()]),ValidateToken,async(req,res)=>{
     
  const {title,description,tag,date} =req.body;
   
   try{
      
     const data= await Notes.create({
      user:req.user.id,
      title:title,
      description:description,
      tag:tag,
      date:date
     })

     res.status(200).json({msg:"note added successsfully"}); 

      
   }catch(err)
   {
    res.status(400).json({error:"internal error occured"}); 
   }
   
   console.log(req.body);

})


router.put("/updatenotes/:id",ValidateToken,async (req,res)=>{
 
  const {title,description,tag} =req.body;
  console.log(req.body);
  const newNote={};

  if(title) newNote.title=title;
  if(description) newNote.description=description;
  if(tag) newNote.tag=tag;

  
     try{ 
   let data=await Notes.findById(req.params.id);
    
    if(!data) {return res.status(404).json({"error":"not found"})}
    
    
    if(data.user.toString()!=req.user.id) {return res.status(402).json({"error":"not authorized"})}
    console.log(data);
    data=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(data);

     }catch(err)
      {
        res.json({error:err});
      }
  

  

})


router.delete("/deletenotes/:id",ValidateToken,async(req,res)=>{

   try {
    let data=await Notes.findById(req.params.id);
    
    if(!data) {return res.status(404).json({"error":"not found"})}
    
    
    if(data.user.toString()!=req.user.id) {return res.status(402).json({"error":"not authorized"})}
     
    data=await Notes.findByIdAndDelete(req.params.id);
    res.json({msg:"successfully deleted"});
     


     
   } catch (error) {
     res.status(400).json({error:error});
   }

})


module.exports = router;