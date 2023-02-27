const mongoose = require('mongoose');
const Joi = require('joi');
const config=require('config');
const jwt = require('jsonwebtoken');
const user_schema = Joi.object({
    name : Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().alphanum().min(5).max(255).required()
    });

     function validateUser(user){
    return user_schema.validate(user);
    }

    const userSchema = new mongoose.Schema({
        name: {
        type: String ,
        required: true ,
        minlength: 5 ,
        maxlength: 50
        },
        email:{
        type: String ,
        required: true ,
        minlength: 5 ,
        maxlength: 50,
        unique:true
        },
        password:{
        type: String ,
        required: true ,
        minlength: 5 ,
        maxlength: 1024
        },
        isAdmin: Boolean
        });

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id : this._id , isAdmin: this.isAdmin} , config.get('jwtPrivateKey'));
    return token;
}

        const User = mongoose.model('User' , userSchema);
        exports.userSchema=userSchema;
        exports.User = User;
        exports.validateUser = validateUser;       