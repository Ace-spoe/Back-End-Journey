// Register controller
const User = require('../models/User')
const bcrypt = require('bcryptjs')
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
            return res.status(400).json({ message : 'No body' });
        }

        const {username , email , password, role} = req.body;

        const checkExistingUser = await User.findOne({$or : [{username} , {email}]});

        // it checks if the username or email esixts the {$or : [{username} , {email}]} is a shorthand for {$or : [{username : req.body.username} , {email : req.body.email}]} but since we already destructed req.body we can use the above shorthand.
        
        if(checkExistingUser){
            //if user doesn't exist it returns null
            return res.status(400).json({
                success : false,
                message : 'User with these data exists.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwrd = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            username, 
            email,
            password: hashedPwrd,
            role: role || 'user'
        });
        //  await newUser.save() : .create() saves automaically so no need to save() it


        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: newUser._id   // helpful
        });

    } catch(err) {
        console.error("Registration Error:", err);   // ← Add this line
        res.status(500).json({
            success: false,
            message: 'Some error occurred, try again from register',
            error: err.message   // ← Temporarily add this too (remove in production)
        });
    }
}
const loginUser = async(req ,res) => {
    try{

    }
    catch(err){
        res.status(500).json({
            success : false,
            message : 'Some error occured , try again from login'
        })
    }
}

module.exports = {loginUser , registerUser}

