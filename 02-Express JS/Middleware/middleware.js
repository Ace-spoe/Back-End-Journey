const express = require('express')
const app = express()

//  Middleware

const middleWare = ((req, res ,next) => {
  console.log('This Middleware runs on every request')

  next()
})

app.use(middleWare)

app.get('/', (req, res) => {
  res.send('  Home page')
})

app.get('/about', (req, res) => {
  res.send('  About page')
})

app.listen(3000,() => {
  console.log('Server listening to 3000')
})