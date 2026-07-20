const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 username : {
    type : String,
    required : true,
    unique : true,
    trim : true
 },
 email : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    lowercase : true
 },
 password : {
    type : String,
    required : true,
 },
 role : {
    type : String,
    enum : ['user' , 'admin'],
    default: 'user',
 }

}, {timestamps : true}) 
// {timestamps : true} automatically add and manage two fileds :
// createdAt: { type: Date, default: Date.now }  // When created
// updatedAt: { type: Date, default: Date.now }  
// When last updated


module.exports = mongoose.model('User', userSchema)