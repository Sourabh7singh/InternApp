const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Saurabh@123';

router.post("/signup", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 3 }),
    
], async (req, res) => {
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    try {
        //check whether the user already exist or not?
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ msg: "User Already Exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Authenticate  a user using : POST on '/api/auth/login' no login required
router.post("/login", [
    body('email', "Enter a valid mail").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Please Try to login with correct credentials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ msg: "Please Try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
            
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;