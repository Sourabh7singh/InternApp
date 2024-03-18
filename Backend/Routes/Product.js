const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const stripe = require('stripe')(process.env.stripe_key);
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
//update after hosting it
const YOUR_DOMAIN = 'http://localhost:3000';
router.post('/create-checkout-session', async (req, res) => {
    const {price}=req.body;
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
  res.json({url:session.url});
});
module.exports = router;