const express = require("express");
const app = express();

let habits = [
    {
        id : 1,
        name : "Demo Habit",
        frequency : "daily",
        streak : 1,
        completedDates : '',
        createdAt : ''
    }
];

//Only write res.status() when the status is not 200.

app.get('/', (req,res)=>{
    res.send("Welcome to the Habit tracker ")
})

app.get('/habits', (req,res)=>{
    res.json(habits)
})

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
         res.status(400).json({
            message : 'Habit not Found!'
        })
    }
    //You can send only one response per request. so
    else{
        reqHabit.id = habits.length + 1;
        reqHabit.name = req.body?.name || reqHabit.name
        reqHabit.frequency = req.body?.frequency || reqHabit.frequency;
        reqHabit.streak = 0;
        reqHabit.createdAt = new Date().toLocaleString('en-US') 
        reqHabit.completedDates=[]

        res.json({
            message: "Updated Successully!",
            data : reqHabit
        })

    }
})

app.delete('/habits/:id', (req, res)=>{
    const unwantedHabit = habits.find(habit => habit.id == req.params.id);
    if(!unwantedHabit){
         res.status(400).json({
            message : 'Habit not Found!'
        })
    }
    // if we had wanted the first match to be returned , we would have used .find , if you need all matches use .filter
    else{
        const  wantedHabit = habits.filter(habit => habit.id !== unwantedHabit.id)

        res.json({
            message : "Deleted Successfully!",
            data : wantedHabit
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
        let date = new Date().toLocaleDateString('en-US');
        
        if(!reqHabit.completedDates.includes(date)){
            reqHabit.completedDates.push(date);
            reqHabit.streak += 1 ;
        }
        
    }
})
// req.query is how you get data sent in the URL after the ? sign.
app.get('/habits', (req,res) =>{
    const FilteredByfrequency = habits.filter(habit => habit.frequency == req.query.frequency)
    !FilteredByfrequency ? 
    res.status(404).json({
        message: 'Habit not Found!'
    }):
    res.json(FilteredByfrequency)

})

const port = 3000;
app.listen(port ,()=>{
    console.log(`server is running on port ${port}`);
    
})