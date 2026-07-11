 const express = require("express");
 const app = express();
 
 //app level settings

 app.set("view engine" , "ejs");
 

 //routing

  app.get('/', (req,res)=>{
    res.send("home page ")
 })


  app.post('/api/data', (req,res)=>{
    res.json({
        message : "Data recieved",
        data : req.body
    })
 })


 app.use((err , req , res , next)=>{
    console.log(err.stack);
    res.status(500).send("Some thing went wrong")
    
 })

 const port = 3000;
 app.listen(port , ()=>{
    console.log(`server listening to ${port}`);
    
 })