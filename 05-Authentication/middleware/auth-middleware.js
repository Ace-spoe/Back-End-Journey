
const jwt = require('jsonwebtoken')
const authmiddleware = (req , res , next) => {
   const authHeader = req.header['authorization']
   const token = authHeader && authHeader.split(" ")[1]

   if(!token){}
   return res.status(401).json({
    success : fasle,
    message : 'Access denied , pls log in'
   })

   try{
    const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decodedToken);

    req.userInfo = decodedTokenInfo
    next()
    
   }catch(err){
    return res.status(500).json({
    success : fasle,
    message :  'Interval server error'
   })
   }

    
    
}

module.exports = authmiddleware