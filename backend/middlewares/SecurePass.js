const bcrypt=require("bcryptjs");

const SecurePass =async(req,res,next)=>{
   
    try{

    const salt=await bcrypt.genSalt(10);  
    const hashedPass=await bcrypt.hash(req.body.password,salt);
    req.body.password=hashedPass;
       

    
    }catch(err)
    {
      console.log(err.message);
    }

    next();
}

module.exports = SecurePass;