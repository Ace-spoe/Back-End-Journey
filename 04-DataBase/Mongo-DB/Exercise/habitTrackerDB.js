const dns = require("node:dns");
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require("mongoose");
const express = require("express");
const dotenv = require('dotenv');

dotenv.config({path : '../../../.env'});

if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is undefined! Check your .env file');
    process.exit(1); // Stop the app
}
const app = express();

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected!"))
.catch(err => console.log(`Database connection error`,err))


app.use(express.json());


const habitSchema = new mongoose.Schema({
    name: {
        type: String,
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
    createdAt: {
        type: Date,
        default: () => {new Date().toLocaleString('en-US')}
    }
});

// this creates a collection with habits(lowecase , plural as of mongo db convention)
const Habit = mongoose.model('Habit', habitSchema);


app.get('/', (req,res)=>{
    res.send("Welcome to the Habit tracker ")
})

app.get('/habits', async (req,res) => {
    try{
        const habits = await Habit.find({});

        if(habits.length == 0){
            return res.json({ message: "No habits yet" , data : [] });
        }

        if(!req.query.frequency){
            return res.json(
            { message: "All habits",
              data : habits
            });
        }

        const filtByFreq = habits.filter(habit => habit.frequency == req.query.frequency);

        if (filtByFreq.length === 0) {
            return res.status(404).json({
                message: "No habits with this frequency",
                data: []
            });
        }
         res.json({ 
            message: "Filtered habits", 
            filteredData: filtByFreq 
        });
    } catch(error){
        res.status(500).json({error : error.message})
    }
})

app.get('/habits/:id', async (req,res) => {
    try{
         const habitByID = await Habit.findById(req.params.id);
         if(!habitByID){
            return res.status(404).json({
                message : 'Habit not found'
            })
         }
         res.json({
            message : "Habit Found",
            data : habitByID
         });
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({
                error: 'Malformatted ID', 
                message: 'Invalid ID format. Must be a 24-character hex string.' 
            })
        }
        res.status(500).json({error : error.message})
    }
   
})

app.post('/habits', async (req,res)=>{
    if(!req.body.name || !req.body.frequency){
        return res.status(400).json({//Bad request
            message : "Please insert the appropriate fields"
        })
    }

    try{
        const {name , frequency} = req.body;
        const newHabit = await Habit.create({name,frequency})
        
        res.status(201).json({
            message : "Created new Habit successfully!",
            data : newHabit
        })
    }catch(error){
        res.status(500).json({error : error.message});
    }
    
})

app.delete('/habits/:id', async (req,res)=>{
    try {
        const deletedHabit = await Habit.findByIdAndDelete(req.params.id);

        if(!deletedHabit){
            return res.status(404).json({
                message : 'Habit not found!'
            })
        }

        // res.json({
        //     message : 'Deleted Succesfully!',
        //     data : deletedHabit
        // }) use the following instead
        res.status(204).end('Deleted Successfully!')


    }catch(error){
        if(error.name === "CastError"){
            return res.status(400).json({
                error : "Malformed error"
            })
        }
        return res.status(500).json({
            error : error.message
        })
    }
})

app.put('/habits/:id/' , async (req,res)=>{
    try{
        const {name , frequency} = req.body;
        const updatedHabit = await Habit.findByIdAndUpdate(
            req.params.id,
            {name,frequency},
            {
            new : true ,
            runValidators: true
            })

            if(!updatedHabit){
                return res.status(404).json({
                    message : "Habit not Found"
                })
            }

            res.json({
                message : 'updated succesfully',
                data : updatedHabit
            })
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({
                error : "Malformed error"
            })
        }
        res.status(500).json({
            error : error.message
        })
    }
})

app.patch('/habits/:id/complete', async (req,res)=>{
    try{
        const habitById = await Habit.findById(req.params.id);
        const today = new Date().toLocaleDateString('en-US');

        if(!habitById){
            return res.status(404).json({
                message : "Habit not found!",
            })
        }
        
        const updatedHabit = await Habit.findByIdAndUpdate(
            req.params.id,
            {
                $push : { completedDates : new Date().toLocaleString('en-US')},
                $inc : {streak : 1} 
            },
            {
                 new : true ,
                runValidators : true
            }
        )
        res.json({
            message : 'Updated successfully!',
            data : updatedHabit
        })

    }catch(error){
        if(error.name === "CastError"){
            return res.status(400).json({ error: "Malformed ID" });
        }
         res.status(500).json({ 
            error: error.message 
        });
    }
})



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

// Notes
// I was forgetting async in the routes handle every time ,
// Use try catch 
// Check for malformed error and other type of error independently.
// 204 for deletion , 500 for server errors 
// findByIdAndUpdate (id, data , {new : true , runVaidators : true}) - the 3rd arg returns the updated while the 4th validate with the schema.
// $push : {completedDates : new Date() } - push to array , $inc : {streak : 1} - increament by 1
// findByIdAndUpdate takes (id, updateObject, options) — three arguments.



