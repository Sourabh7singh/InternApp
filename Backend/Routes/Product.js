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
router.post("/add",async(req,res)=>{
    try {
        console.log("Saving");
        console.log(req.body);
        const newProduct = await Product.create({
            course_name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image
        })
        await newProduct.save();
        console.log("Saving");
        res.json({"msg":`Product with name ${newProduct.course_name} added successfully`});
    } catch (error) {
        console.log(error.message);
        res.json({msg:"Error"});
    }
})
router.post("/delete/:id",async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({msg:`Deleted Product ${product.course_name}`});
    } catch (error) {
        res.json({msg:"Error"});
    }
})
module.exports = router;