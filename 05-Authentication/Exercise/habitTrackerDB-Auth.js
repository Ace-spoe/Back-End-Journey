const dns = require('node:dns')
dns.setServers(['1.1.1.1', '8.8.8.8'])

const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dotenv.config({ path : '../../../.env' })

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is undefined! Check your .env file')
  process.exit(1) // Stop the app
}
const app = express()

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err)
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch(err => console.log('Database connection error',err))


app.use(express.json())

// eslint-disable-next-line no-unused-vars
function errorHandler (error, req, res , next){
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed ID' })

  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  res.status(500).json({
    error: error.message
  })

}


//SCHEMAS & MODELS

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength : 2,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  completedDates: {
    type: [Date],
    default: []
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'HabitUser',
    required : true
  }
} ,{timestamps : true})

// this creates a collection with habits(lowecase , plural as of mongo db convention)
const Habit = mongoose.model('Habit', habitSchema)

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true 
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true 
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    }
},{timestamps : true})

const HabitUser = mongoose.model('HabitUser' , userSchema)

//REGISTER AND LOGIN ROUTERS

const authrouter = express.Router()
authrouter.post('/register', async (req , res , next) => {
    try {

        if(!req.body){
        return res.status(400).json({
            success : false ,
            message : "Enter body"
        })
    }

    const {username , email , password , role} = req.body

    if(!(username && email && password)){
        return res.status(400).json({
            success : false ,
            message : "Important credentials missing"
        })
    }

    const checkUserExisits = await HabitUser.findOne({
        $or : [{username} ,{email}]
    })

    if(checkUserExisits){
        return res.status(400).json({
            success : false ,
            message : "User with such data exists"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await HabitUser.create({
        username , email , 
        password : hashedPassword,
        role : role || 'user'
    })



    res.status(201).json({
        sucess : true,
        message : 'Registered Successfully!',
        userId : newUser._id
    })


    }catch(err){
        next(err)
    }
})

authrouter.post('/login', async (req , res, next) => {
    try{
         if(!req.body){
        return res.status(400).json({
            success : false ,
            message : "Enter body"
        })
        }

    const { email , password } = req.body

    if(!(email && password)){
        return res.status(400).json({
            success : false ,
            message : "Important credentials missing"
        })
    }

    const user = await HabitUser.findOne({email})

    if(!user){
        return res.status(401).json({
            success : false ,
            message : "Invalid Email or password"
        })
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.status(401).json({
            success : false ,
            message : "Invalid Email or password"
        })
    }

    const accessToken = jwt.sign(
        {
            userId : user._id,
            email : user.email,
            role : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '15m'
        }
    )
    res.json({
        success : true, 
        message : "logged in successfully",
        token : accessToken,
        userData : {
            ID : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })


    }catch(err){
        next(err)
    }
})

app.use('/api/auth', authrouter)

//AUTHENTICATION MIDDLEWARES
const authmiddlware = (req ,res , next) => {
    try{

        
        const authHeader = req.headers['authorization']

        if(!authHeader){
            return res.status(401).json({
                success  : false ,
                message : 'No header'
            })
        }
        const token = authHeader && authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success  : false ,
                message : 'Unauthorized user'
            })
        }

        let decodedtokenInfo

        try{
           decodedtokenInfo = jwt.verify(
            token , process.env.JWT_SECRET
        )
        //jwt.verify() Returns the Decoded Payload + iat (issued at) and exp , if expired it throws an error
        // and that's why we are using a try catch instead of and if else block
        }catch(err){
          return res.status(401).json({
                success  : false ,
                message : 'Unauthorized user'
            })
        }
      
        req.userInfo = decodedtokenInfo
        next()

    }catch(err){
        next(err)
    }

}

app.get('/', (req,res) => {
  res.send('Welcome to the Habit tracker ')
})

app.get('/habits', authmiddlware ,async (req,res,next) => {
  try{
    const { userId }= req.userInfo
    const habits = await Habit.find({userId})

    if(habits.length === 0){
      return res.json({ message: 'No habits yet' , data : [] })
    }

    if(!req.query.frequency){
      return res.json(
        { message: 'All habits',
          data : habits
        })
    }

    const filtByFreq = habits.filter(habit => habit.frequency === req.query.frequency)

    if (filtByFreq.length === 0) {
      return res.status(404).json({
        message: 'No habits with this frequency',
        data: []
      })
    }
    res.json({
      message: 'Filtered habits',
      filteredData: filtByFreq
    })
  } catch(error){
    next(error)
  }
})

app.get('/habits/:id' ,authmiddlware,async (req,res,next) => {
  try{
    
    const habitByID = await Habit.findOne({
      _id : req.params.id ,
      userId : req.userInfo.userId
    })

    if(!habitByID){
      return res.status(404).json({
        message : 'Habit not found'
      })
    }
    res.json({
      message : 'Habit Found',
      data : habitByID
    })
  }catch(error){
    next(error)
  }

})

app.post('/habits', authmiddlware, async (req,res,next) => {

  if(!req.body.name || !req.body.frequency){
    return res.status(400).json({ //Bad request
      message : 'Please insert the appropriate fields'
    })
  }

  try{
    const { name , frequency } = req.body
    const { userId } = req.userInfo
    const newHabit = await Habit.create({ name,frequency, userId })

    res.status(201).json({
      message : 'Created new Habit successfully!',
      data : newHabit
    })
  }catch(error){
    next(error)
  }

})

app.delete('/habits/:id', authmiddlware ,async (req,res,next) => {
  try {
    const deletedHabit = await Habit.findOneAndDelete({
      _id : req.params.id ,
      userId : req.userInfo.userId
    })
  // findByIdAndDelete only accepts an ID as its first argument, so it can't check ownership at the same time. Use findOneAndDelete instead, which accepts a full filter object.

    if(!deletedHabit){
      return res.status(404).json({
        message : 'Habit not found!'
      })
    }

   res.status(204).end()
    //res.status(204).end('Deleted Successfully!')
    // 204 responses to have no body at all so its better if we leave it without a response or use different status code

  }catch(error){
    next(error)
  }
})

app.put('/habits/:id/' , authmiddlware, async(req,res,next) => {
  try{
    const { name , frequency } = req.body
    const updatedHabit = await Habit.findOneAndUpdate(
      {
      _id : req.params.id ,
      userId : req.userInfo.userId
      },
      { name, frequency },
      {
        new : true ,
        runValidators: true
      })

    if(!updatedHabit){
      return res.status(404).json({
        message : 'Habit not Found'
      })
    }

    res.json({
      message : 'updated succesfully',
      data : updatedHabit
    })
  }catch(error){
    next(error)
  }
})

app.patch('/habits/:id/complete',authmiddlware ,async (req,res,next) => {
  try{
    const habitById = await Habit.findOne({
       _id: req.params.id, 
       userId: req.userInfo.userId 
    })
    const today = new Date().toDateString()

    if(!habitById){
      return res.status(404).json({
        message : 'Habit not found!',
      })
    }

    const completedDatesAlteredArray = habitById.completedDates.map(date => date.toDateString())
    if(completedDatesAlteredArray.includes(today)){
      return res.status(400).json({
        message : 'Already Registered'
      })
    }


    habitById.completedDates.push(today)
    habitById.streak += 1
    const updatedHabit = await habitById.save()
    res.json({
      message : 'Updated successfully!',
      data : updatedHabit
    })



  }catch(error){
    next(error)
  }
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})



