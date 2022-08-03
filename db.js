const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const db =async()=>{
    try{
        await mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log('db connected')
    }catch(err){
        console.log('error',err)
    }
}

module.exports = db;