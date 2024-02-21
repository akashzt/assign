const mongoose=require('mongoose');
require('dotenv').config();


const uri = process.env.monogoDbUrl;  // connection string for our database
const connectDb = async()=>{
    try{
    const conn= await mongoose.connect(uri);

    console.log(`mongodb connected ${conn.connection.host}`)
    }catch(err){
        throw err;
    }
}

module.exports=connectDb;