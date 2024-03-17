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
        description:req.body.description
    })
    try {
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch (error) {
        res.json("Error");
    }
})
router.post("/update",async(req,res)=>{
    try {
        const event = await Events.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            description:req.body.description
        });
        res.json(event);
    } catch (error) {
        res.json("Error");
    }
})
module.exports = router;