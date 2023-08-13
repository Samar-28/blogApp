const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();
const mongoURI = process.env.URI;
const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
    console.log("Done")
}

module.exports = connectToMongo