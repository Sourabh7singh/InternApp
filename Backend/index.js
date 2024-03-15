const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectMongo = require("./db");
const cors = require('cors');
const app = express();
const User = require('./Models/User');

connectMongo();
const port = process.env.port;

app.use(express.json());
// Enable CORS for all domains
app.use(cors());

app.use("/api/user",require("./Routes/User"));
app.use("/api/product",require("./Routes/Product"));
app.use("/api/events",require("./Routes/Events"));

app.get("/",async(req,res)=>{
    res.json("Server running");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})