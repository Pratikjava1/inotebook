const { query, validationResult } = require('express-validator');



const Validator= (validations)=>{
    
 return async(req,res,next)=>{
    await Promise.all(validations.map(el=>el.run(req)));
    const errors = validationResult(req);
   console.log(errors);
    if(!errors.isEmpty()){
      return res.status(400).json({error:errors.array()})
   
    }
    
      return next();
  
 }
 console.log("here");
}  
 
   


module.exports=Validator;

