//Had to use these in the top 
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


const mongoose = require("mongoose");

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Data base connected"))
.catch((err)=> console.log(err)
)

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {
        type : Date , 
        default : Date.now()}
})


const User = mongoose.model('User' , userSchema);

async function runQueryExample(){
    try{
        // const newUser = await User.create({
        //     name : "Joe",
        //     email : 'Joe@gmail.com',
        //     age : '40',
        //     isActive : true,
        //     tags : ['developer' , 'manager'],
            
        // })

        // console.log('Created a new User');

        const allUsers = await User.find({});

        console.log(User);
        
        
        
    }catch(err){

        console.log(`Error ->` , err);

    }finally{
        await mongoose.connection.close()
    }
}

runQueryExample();


// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ Error:', err));

// app.listen(3000, () => console.log('Server running on 3000'));