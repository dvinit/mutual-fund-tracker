const bcrypt = require('bcrypt'); 
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const { userSchema, User, validateUser } = require('../models/user');

            
    
    router.post('/', async(req, res) => {
        const {error} = validate(req.body);
    if(error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is not valid');
const validPassword = await  bcrypt.compare(req.body.password,user.password); 
    if(!validPassword)return res.status(400).send('Email or password is not valid');
    const token = user.generateAuthToken();
    res.send(token);
       });


function validate(req){
    const user_schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().alphanum().min(5).max(255).required()
        });
return user_schema.validate(req);
}

module.exports=router;
