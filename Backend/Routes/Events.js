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

module.exports = router;