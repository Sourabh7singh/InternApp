const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const express = require('express');
const connectMongo = require("./db");
const cors = require('cors');
const app = express();
const User = require('./Models/User');

connectMongo();
const port = process.env.port;

// Increase the limit to 50MB (or any size that suits your needs)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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