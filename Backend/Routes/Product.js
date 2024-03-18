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
            product.purchasedBy.push({userId,Date:new Date()});
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
//Get all sales for admin
router.get('/sales', async (req, res) => {
    try {
        const today = new Date();
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(today.getDate() - 1);

        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);

        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);

        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const matchQuery = { 'purchasedBy': { $exists: true, $ne: [] } }; // Match documents where purchasedBy exists and is not an empty array

        const oneDaySales = await Product.aggregate([
            { $match: { ...matchQuery, 'purchasedBy.date': { $gte: oneDayAgo } } },
            { $group: { _id: null, totalSales: { $sum: '$price' } } }
        ]);

        const oneWeekSales = await Product.aggregate([
            { $match: { ...matchQuery, 'purchasedBy.date': { $gte: oneWeekAgo } } },
            { $group: { _id: null, totalSales: { $sum: '$price' } } }
        ]);

        const oneMonthSales = await Product.aggregate([
            { $match: { ...matchQuery, 'purchasedBy.date': { $gte: oneMonthAgo } } },
            { $group: { _id: null, totalSales: { $sum: '$price' } } }
        ]);

        const oneYearSales = await Product.aggregate([
            { $match: { ...matchQuery, 'purchasedBy.date': { $gte: oneYearAgo } } },
            { $group: { _id: null, totalSales: { $sum: '$price' } } }
        ]);

        const lifetimeSales = await Product.aggregate([
            { $match: matchQuery },
            { $group: { _id: null, totalSales: { $sum: '$price' } } }
        ]);

        res.json({
            oneDaySales: oneDaySales.length > 0 ? oneDaySales[0].totalSales : 0,
            oneWeekSales: oneWeekSales.length > 0 ? oneWeekSales[0].totalSales : 0,
            oneMonthSales: oneMonthSales.length > 0 ? oneMonthSales[0].totalSales : 0,
            oneYearSales: oneYearSales.length > 0 ? oneYearSales[0].totalSales : 0,
            lifetimeSales: lifetimeSales.length > 0 ? lifetimeSales[0].totalSales : 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;