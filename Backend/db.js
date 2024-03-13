const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.mongoURI;

const connectMongo=()=>{
mongoose.connect(mongoURI).then(()=>{console.log("Connected to database")});
}

module.exports=connectMongo;




