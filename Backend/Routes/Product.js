const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const stripe = require('stripe')(process.env.stripe_key);
//Fetch all the products
router.get('/fetch', async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data); 
    } catch (error) {
        res.json("Error");
    }
});

router.post("/add",async(req,res)=>{
    try {
        const newProduct = await Product.create({
            course_name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image
        })
        await newProduct.save();
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
router.post("/update/:id",async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body);
        res.json({msg:`Updated Product ${product.course_name}`});
    } catch (error) {
        res.json({msg:"Error"});
    }
})
router.post("/purchased",async(req,res)=>{
    const {userId,productId} = req.body;
    try {
        const product = await Product.findById(productId);
        console.log("here");
        if(product){
            product.purchasedBy.push(userId);
            const savedProduct = await product.save();
            res.json({"msg":`Purchased ${savedProduct.course_name}`});
        }else{
            res.json({"msg":"Product not found"});
        }
    } catch (error) {
        console.log(error.message);
        res.json({"msg":"Error"});
    }
})
//update after hosting it
const YOUR_DOMAIN = 'http://localhost:3000';
router.post('/create-checkout-session', async (req, res) => {
    const {price,productId}=req.body;
    const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
            currency:"inr",
            product_data:{
                name:"Course",
            },
            unit_amount:price*100
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  res.json({url:session.url,productId});
});
module.exports = router;