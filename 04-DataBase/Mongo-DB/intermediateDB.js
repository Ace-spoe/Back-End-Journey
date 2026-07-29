const dns = require('node:dns')
dns.setServers(['8.8.8.8' , '1.1.1.1'])

require('dotenv').config({path : '../../.env'})

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to DB')
})
.catch(err => {
    console.log('failed to connect to DB :' , err)
})

app.use(express.json())


//Produt .js
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'books', 'food', 'other']
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
     }
    // ,
    // images: [{
    //     type: String,
    //     trim: true
    // }],
    // seller: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

//Controller.js
 
const sampleProducts = [
    {
        name: "Wireless Headphones",
        description: "High-quality noise-canceling Bluetooth headphones with 20-hour battery life.",
        price: 79.99,
        category: "electronics",
        stock: 45
    },
    {
        name: "Cotton T-Shirt",
        description: "Comfortable 100% organic cotton t-shirt, available in multiple colors.",
        price: 24.99,
        category: "clothing",
        stock: 120
    },
    {
        name: "Programming Book",
        description: "Complete guide to JavaScript, covering ES6 to modern frameworks.",
        price: 39.99,
        category: "books",
        stock: 30
    },
    {
        name: "Organic Coffee Beans",
        description: "Premium dark roast organic coffee beans, 1kg bag.",
        price: 18.50,
        category: "food",
        stock: 75
    },
    {
        name: "Smartphone Stand",
        description: "Adjustable aluminum smartphone stand for desk use.",
        price: 15.99,
        category: "electronics",
        stock: 200
    },
    {
        name: "Yoga Mat",
        description: "Eco-friendly non-slip yoga mat, 6mm thickness.",
        price: 29.99,
        category: "other",
        stock: 50
    }
];

const insertMultipleProducts = async ( req ,res ) => {
    try{
        // insertMany is the method used to insert multiple documents into a MongoDB collection in a single operation.
        // Syntax : Product.insertMany(documents, options)
        const result = await Product.insertMany(sampleProducts)
        res.status(201).json({
            success : true,
            message : `Inserted ${result.length} produts`
        })
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : 'internal sever error'
        })
    }
   

}

const getProductAnalysis = async (req , res) => {
    try{
        const result = await Prouduct.aggregate([
            {
                $match : { // like find({})
                    price : { $gte : 100},
                    stock : { $gte : 50 }
                }
            },
            {
                $group : {
                    _id : "$category",
                    totalPrice : {$sum : "price"},
                    totalProducts : {$sum : 1},
                    averagePrice : {$avg : "price"},
                    maxPrice : { $max : "price"},
                    minPrice : { $min : "price"}
                }
            },
            {
                $project : {
                    _id : 0,
                    category : "$_id",
                    totalPrice : 1,
                    averagePrice : 1,
                    maxPrice : 1,
                    minPrice : 1 
                }
            }
        ])
    }catch(err){
        return res.status(500).json({
            success : false ,
            message : 'internal sever error'
        })
    }
}








app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening to ${process.env.PORT}`)
})


