const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose"); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'abcdefghijklmnopqrstuvwxyz';

const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.get('/test', (req,res) => {
    res.json('test');
});

// wZPJCkcvDJZj7dTJ
// 2n0ZeUXZlp7OLVrr


app.post('/register', async (req,res) => {
    const {first_name, last_name, username, phone, email, password, host, tenant} = req.body;
    try{
        const userDoc = await User.create({
            first_name,
            last_name,
            username,
            phone,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
            host,
            tenant
        });
        res.json(userDoc);
    } catch(e){
        res.status(422).json(e);
    } 
});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email}); 
    if (userDoc) {   
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {  
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id
              }, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
              });
        } else {
          res.status(422).json('Wrong password');
        }
    } else {
        res.json('User not found');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {first_name, email, _id} = await User.findById(userData.id); //fetch from the database
            res.json({first_name, email, _id}); 
        });
    } else {
        res.json(null);
    }
    // res.json({token});
})

app.listen(4000);
