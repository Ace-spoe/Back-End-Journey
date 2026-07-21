const dns = require('node:dns')
dns.setServers(['1.1.1.1','8.8.8.8'])

const mongoose = require('mongoose')
if(!process.env.MONGO_URI){
  console.log('MONGO_URI problem')

  process.exit(1)
}

const connectToDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DataBase connected successfully!')

  }catch(err){

    console.log('DB connection Failed :', err)
    process.exit(1)
  }
}

module.exports = connectToDB



// mongoose.connection.on('err', err => console.log(err))
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{console.log('DataBase connected successfully!')})
// .catch(err => {console.log(err)})
