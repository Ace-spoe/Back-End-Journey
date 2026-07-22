
const jwt = require('jsonwebtoken')

const authmiddleware = (req , res , next) => {
   
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]
   console.log(token)
   if(!token){
      return res.status(401).json({
      success : false,
      message : 'Access denied , pls log in'
      })
   }

   if(!process.env.JWT_SECRET){
      console.log('JWT not defined')
      process.exit(1)
   }
   

   try{
    const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET)

    console.log(decodedTokenInfo);

    req.userInfo = decodedTokenInfo
    next()
    
   }catch(err){
    return res.status(401).json({
    success : false,
    message : 'Invalid token'
   })
   }

    
    
}

module.exports = authmiddleware