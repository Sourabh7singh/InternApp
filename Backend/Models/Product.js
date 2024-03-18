const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    course_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    purchasedBy:{
        type:Object
    }
  });

  module.exports=mongoose.model('product',ProductSchema);