const express = require("express");
const app = express();


app.use(express.json());
//So the error in post (even though my input was valid it was still saying 400 ) is because I had no `app.use(express.json());`

let habits = [
    {
        name : "Demo Habit",
        frequency : "daily",
        id : 1,
        streak : 0,
        completedDates :[],
        createdAt : ''
    }
];

//Only write res.status() when the status is not 200.

app.get('/', (req,res)=>{
    res.send("Welcome to the Habit tracker ")
})

// app.get('/habits', (req,res)=>{
//     res.json(habits)
// })

app.get('/habits/:id', (req,res)=>{
    const reqHabit = habits.find(habit => habit.id == req.params.id)
    reqHabit ?
    res.json(reqHabit):
    res.status(404).json({
        message :"Habit no Found!"
    })


})

app.post('/habits', (req,res)=>{
    let newHabit = req.body;
    if(!(newHabit && newHabit.name && newHabit.frequency)){
        res.status(400).json({
            message : 'Important properties are missing , please Try Again'
        })
    }
    else{
        newHabit = {...newHabit, 
                    id: habits.length + 1,
                    streak : 0,
                    completedDates:[],
                    createdAt : new Date().toLocaleString('en-US')
                    }

        habits.push(newHabit)
        res.status(201).json({
            message: "Habit added successfully",
            data : newHabit
            
        })
    }
})


app.put('/habits/:id',(req,res)=>{
    const reqHabit = habits.find(habit => habit.id == req.params.id);
    if(!reqHabit){
         res.status(404).json({
            message : 'Habit not Found!'
        })
    }
    //You can send only one response per request. so
    else{
        
        // reqHabit.id = reqHabit.id
        reqHabit.name = req.body?.name || reqHabit.name
        reqHabit.frequency = req.body?.frequency || reqHabit.frequency;
        reqHabit.streak =  0;
        reqHabit.createdAt = new Date().toLocaleDateString('en-US');
        reqHabit.completedDates = []

        res.json({
            message: "Updated Successully!",
            data : reqHabit
        })

    }
})

app.delete('/habits/:id', (req, res)=>{
    const unwantedHabit = habits.find(habit => habit.id == req.params.id);
    if(!unwantedHabit){
        //return to stop exe. after 404
        return res.status(404).json({
            message : 'Habit not found!'
        })
    }
    // if we had wanted the first match to be returned , we would have used .find , if you need all matches use .filter
    else{
          habits = habits.filter(habit => habit.id !== unwantedHabit.id)
        // We can do res.status(204) for no content and return no data
        res.json({
            message : "Deleted Successfully!",
            data : unwantedHabit
        })
    }
})

app.patch('/habits/:id/complete' , (req ,res)=>{
    const reqHabit = habits.find(habit => habit.id == req.params.id);
    if(!reqHabit){
         res.status(400).json({
            message : 'Habit not Found!'
        })
    }
    else{

        const date = new Date().toLocaleDateString('en-US');
        
        if(!reqHabit.completedDates.includes(date)){
            reqHabit.completedDates.push(date);
            reqHabit.streak += 1 ;
        }
        
        res.json({
            message : 'updated succssfully',
            data : reqHabit
        })
        
    }
})
// req.query is how you get data sent in the URL after the ? sign.
app.get('/habits', (req,res) =>{
//No query case
    if(!req.query.frequency){
        return res.json(habits);
    }

    // if(req.query.frequency){ 
        // req.query.freequency should be checked cause if not if the user don't enter frequency here I I will comaprsion will be habit.frequecny === undefined which will result in no habits that means it will interfer with the other get codes so solution : Only apply the filter if the user actually sent the frequency in the query.
        //}

        let habitsFilteredByfrequency = habits.filter(habit => habit.frequency == req.query.frequency)
    
    
    //filter always return an array even if empty adn cause even [] is also true in js I shouldn't be using !habitsFilteredByfrequency

    if(habitsFilteredByfrequency.length == 0) {
        // used if else instead of ternary cause it gets messy when codes are longer

        //Rule of thumb: Use ternary for simple values. Use if-else for logic and responses.
        return res.json({
        message: 'No habit with  given frequency!'
    })
    } 
    else{
        res.json({
        message : `Found`,
        count: habitsFilteredByfrequency.length,
        data: habitsFilteredByfrequency})
    }
    

})

const port = 3000;
app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
    
})