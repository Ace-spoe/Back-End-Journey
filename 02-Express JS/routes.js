 const express = require("express");
 const app = express();
 
 //Root route

 app.get('/', (req,res)=>{
    res.send("Welcome to home page ")
 })


//Route to get all products

app.get('/products', (req,res)=>{

    
    const product = [
        {id: 1 , label : "P1"},
        {id: 2 , label : "P2"},
        {id: 3 , label : "P3"}
    ]
    res.json(product)
 })

 //To get specific product
app.get('/products/:Dynamicid', (req,res)=>{
    // ':' for dynamic routing 
    console.log(req.params)
    const productId = parseInt(req.params.Dynamicid)
     const product = [
        {id: 1 , label : "P1"},
        {id: 2 , label : "P2"},
        {id: 3 , label : "P3"}
    ]

    const specifiedProduct = product.find((product)=> product.id == productId)
    

    if(specifiedProduct){
        res.json(specifiedProduct)
    }
    else{
        res.status(404).send("404 NOT FOUND!")
    }

 })


  const port = 3000;
 app.listen(port , ()=>{
    console.log(`server listening to ${port}`);
    
 })



//Router Example

    // routes/products.js
    // const router = express.Router();
    // router.get('/:id', (req, res) => { ... });
    // router.get('/', (req, res) => { ... });
    // module.exports = router;

    // // app.js
    // app.use('/products', require('./routes/products'));