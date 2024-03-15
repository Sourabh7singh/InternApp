const mongoose = require('mongoose');
const {Schema}=mongoose;

const EventSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Event',EventSchema);