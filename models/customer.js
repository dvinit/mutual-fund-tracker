const mongoose = require('mongoose');
const Joi = require('joi');

const customer_schema = Joi.object({
    name : Joi.string().alphanum().min(5).max(50).required(),
    isGold:Joi.boolean(),
    phone: Joi.string()
    });


     function validateCustomer(customer){
    return customer_schema.validate(customer);
    }
    const customerSchema = new mongoose.Schema({
        name: {
        type: String ,
        required: true ,
        minlength: 5 ,
        maxlength: 50
        },
        isGold: {
        type: Boolean
        },
        phone: {
        type: String,
        required: true
        }
        });

        const Customer = mongoose.model('Customer' , customerSchema);
            
        exports.Customer = Customer;
        exports.validate = validateCustomer;