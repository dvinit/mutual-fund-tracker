const auth = require('../middleware/auth');
const {Customer,validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { number } = require('joi');




    // Getting all the customers in the library
    router.get('/', async(req, res) => {
        const customer = await Customer.find().sort('name');
        res.send(customer);
       });
    
    
    // Getting a customer with a particular id   
    router.get('/:id', async(req, res) => {
    const id = req.params.id ;
    const customer = await Customer.findById(id);
    if(!customer)return res.status(404).send('Customer with given id not found');
    res.send(customer);
       });   
    
    router.post('/',auth, async(req,res) => {
       // console.log(req.body);
    const {error,value} = validate(req.body);
    if(error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    let customer = new Customer(req.body); 
    customer = await customer.save();

    res.send(customer);
    });   
    
    //sends old customer back after updating
    router.put('/:id',auth, async(req,res) => {
        const {error,value} = validate(req.body);
        if(error){
            console.log(error.details[0].message);
           return res.status(400).send(error.details[0].message);
        }
        customer = await Customer.findByIdAndUpdate(req.params.id,req.body);
        if(!customer)return res.status(404).send('Customer with given id not found');
        res.send(customer);
        });  
    
    router.delete('/:id',auth,async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer)return res.status(404).send('Customer with given id not found');
     res.send(customer);
    });


        module.exports=router;