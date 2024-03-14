const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

//Fetch all the products
router.get('/fetch', async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data); 
        console.log("Responce sent");
    } catch (error) {
        res.json("Error");
    }
});

module.exports = router;