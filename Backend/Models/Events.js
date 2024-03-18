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
    joinedBy:{
        type:Array,
    },
    date:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Event',EventSchema);