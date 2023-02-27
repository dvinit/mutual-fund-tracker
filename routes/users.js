const auth = require('../middleware/auth');
const config=require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const { userSchema, User, validateUser } = require('../models/user');

    router.get('/me',auth, async(req,res) =>{
const user = await User.findById(req.user._id).select('-password');
res.status(200).send(user);
    });        
    
    router.post('/', async(req, res) => {
        const {error,value} = validateUser(req.body);
    if(error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered'); 
    user = new User({ 
    name: req.body.name, 
    email: req.body.email,
    password: req.body.password 
    }); 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
       });

module.exports=router;
