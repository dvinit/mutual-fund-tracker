const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const error = require('../middleware/error');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { genreSchema, Genre, validateGenre } = require('../models/genre');
//const { exceptions } = require('winston');

            
    // Getting all the book types in the library
    router.get('/', asyncMiddleware(async(req, res,next) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
       }));
    
    
    // Getting a book type with a particular id   
    router.get('/:id', asyncMiddleware(async(req, res) => {
    const id = req.params.id ;
    const genre = await Genre.findById(id);
    if(!genre)return res.status(404).send('Genre with given id not found');
    res.send(genre);
       }));   
    
    router.post('/', auth, asyncMiddleware(async(req,res) => {
    const {error,value} = validateGenre(req.body);
    if(error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({name: req.body.name }); 
    genre = await genre.save();
    res.send(genre);
    }));   
    
    router.put('/:id',auth, asyncMiddleware(async(req,res) => {
      
    const {error,value} = validateGenre(req.body);
         
    if(error){
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
    }
        let genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name , new:true});
        if(!genre)return res.status(404).send('Genre with given id not found');
        res.send(genre);
        }));  
    
    router.delete('/:id',[auth,admin], asyncMiddleware(async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre)return res.status(404).send('Genre with given id not found');
     res.send(genre);
    }));

        module.exports=router;