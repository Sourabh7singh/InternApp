const express = require('express');
const router = express.Router();
const Events = require('../Models/Events');

router.get("/",async(req,res)=>{
    try {
        const event = await Events.find();
        res.json(event);
    } catch (error) {
        res.json("Error");
    }
})
router.post("/delete",async(req,res)=>{
    try {
        const event = await Events.findByIdAndDelete(req.body.id);
        res.json({msg:`Deleted Event ${event.name}`});
    } catch (error) {
        res.json({msg:"Error"});
    }
})
router.post("/add",async(req,res)=>{
    const event = new Events({
        name:req.body.name,
        description:req.body.description,
        date:req.body.date
    })
    try {
        const savedEvent = await event.save();
        res.json({"msg":`Event with name ${savedEvent.name} added successfully`});
    } catch (error) {
        res.json({"msg":"Error"});
    }
})
router.post("/update",async(req,res)=>{
    const {id,name,description,date} = req.body;
    try {
        const event = await Events.findByIdAndUpdate(req.body.id,{name,description,date});
        res.json({"msg":`Event Updated ${event.name}`});
    } catch (error) {
        console.log(error.message);
        res.json({"msg":"Error"});
    }
})
//Join an event by user
router.post("/join/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const event = await Events.findById(id);
        if(event){
            event.joinedBy.push(req.body.userId);
            const savedEvent = await event.save();
            res.json({"msg":`Joined ${savedEvent.name}`});
        }else{
            res.json({"msg":"Event not found"});
        }
    } catch (error) {
        console.log(error.message);
        res.json({"msg":"Error"});
    }
    
})
module.exports = router;