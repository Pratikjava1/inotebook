const jsonwebtoken=require('jsonwebtoken');
const secret="I am a coder";

const ValidateToken=(req,res,next)=>{

   const token =req.header("auth-token");
   console.log(token);
   if(!token) return res.status(401).json({error:"please authenticate using valid token"});

   try {
      
    const data=jsonwebtoken.verify(token,secret);
 
      req.user=data.user;
      next();
    
   } catch (error) {
    return res.status(401).json({error:"please authenticate using valid token"});
   }

}



module.exports= ValidateToken;