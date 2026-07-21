// Register controller
/*eslint-disable*/
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
//original
// const registerUser = async(req , res) => {
//     try{
//         if(!req.body){
//             return res.status(400).json({
//                 message : 'No body'
//             })
//         }
//         const {username , email , password, role} = req.body
//         // it checks if the username or email esixts the {$or : [{username} , {email}]} is a shorthand for {$or : [{username : req.body.username} , {email : req.body.email}]} but since we already destructed req.body we can use the above shorthand.
//         const checkExistingUser = await User.findOne({$or : [{username} , {email}]})
//         //if user doesn't exist it returns null
//         if(checkExistingUser){
//             return res.status(400).json({
//                 success : false,
//                 message : 'User with these data exists.'
//             })
//         }

//         const salt = await bcrypt.genSalt(10)

//         const hashedPwrd = await bcrypt.hash(password,salt)

//         const newUser  = await User.create({
//             username , email ,
//             password : hashedPwrd,
//             role : role || 'user'
//         })

//     //    await newUser.save() : .create() saves automaically so no need to save() it

//        if(newUser){
//         res.status(201).json({
//             success : true,
//             message : 'User registred successfully'
//         })
//        }else{
//         res.status(400).json({
//             success : false,
//             message : 'Unable to register user'
//         })
//        }



//     }catch(err){
//         res.status(500).json({
//             success : false,
//             message : 'Some error occured , try again from register'
//         })
//     }
// }

//log in controller

// const loginUser = async(req ,res) => {
//     try{

//     }
//     catch(err){
//         res.status(500).json({
//             success : false,
//             message : 'Some error occured , try again from login'
//         })
//     }
// }

//trial
const registerUser = async(req , res) => {
  try{
    if(!req.body){
      return res.status(400).json({ message : 'No body' })
    }

    const { username , email , password, role } = req.body

    const checkExistingUser = await User.findOne({ $or : [{ username } , { email }] })

    // it checks if the username or email esixts the {$or : [{username} , {email}]} is a shorthand for {$or : [{username : req.body.username} , {email : req.body.email}]} but since we already destructed req.body we can use the above shorthand.

    if(checkExistingUser){
      //if user doesn't exist it returns null
      return res.status(400).json({
        success : false,
        message : 'User with these data exists.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPwrd = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      email,
      password: hashedPwrd,
      role: role || 'user'
    })
    //  await newUser.save() : .create() saves automaically so no need to save() it


    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: newUser._id   // helpful
    })

  } catch(err) {
    console.error('Registration Error:', err)   // ← Add this line
    res.status(500).json({
      success: false,
      message: 'Some error occurred, try again from register',
      error: err.message   // ← Temporarily add this too (remove in production)
    })
  }
}
const loginUser = async(req ,res) => {
  try{
    const { email , password } = req.body

    if(!(email && password)){
      return res.status(400).json({
         success: false,
        message : 'Please enter email and password '
      })
    }


  const user = await User.findOne({email})

  if(!user){
    return res.status(401).json({
       success: false,
      message : "Invalid email or password"// for security purpose generic message is better
      // 'User with these credentials does not exist' 
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    return res.status(401).json({
      success: false,
      message : "Invalid email or password"// similarly for security , attackers shouldn't know which emails are registered.
    })
  }

  const accessToken = generateToken(user)
 res.json({ 
  success: true,
  message: 'Login successful',
  token : accessToken,
  userData: { id: user._id,
           username: user.username,
           email: user.email,
           role: user.role
         } 
          });

  }
  catch(err){
    console.error("Login Error:", err);//for debugging
    res.status(500).json({
      success : false,
      message : 'Some error occured , try again from login'
    })
  }
}

module.exports = { loginUser , registerUser }

