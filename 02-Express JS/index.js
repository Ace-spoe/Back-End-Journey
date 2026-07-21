const express = require('express')
const app = express()


app.get('/', (req,res) => {
  res.send('Hello there , I am /')
})




const port = 3000
app.listen(port , () => {
  console.log(`server listening to ${port}`)

})


