require('dotenv').config({ path : '../.env' })

const express = require('express')
const connectToDB = require('./dataBase/db')
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes') 
const uploadImageRoutes = require('./routes/image-routes')
if(!process.env.PORT){
  console.log('PORT is undefined')
  process.exit(1)
}

const app = express()
app.use(express.json())
app.use('/api/auth' , authRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/image' , uploadImageRoutes)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))


const startServer = async () => {
  try {
    await connectToDB()
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()


