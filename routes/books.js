const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { bookSchema, Book , validate } = require('../models/book');
const Joi = require('joi');
const { genreSchema,Genre, validateGenre } = require('../models/genre');





    // Getting all the book types in the library
    router.get('/', async(req, res) => {
        const books = await Book.find().sort('title');
        res.send(books);
       });
    
    
    // Getting a book type with a particular id   
    router.get('/:id', async(req, res) => {
    const id = req.params.id ;
    const book = await Book.findById(id);
    if(!book)return res.status(404).send('Book with given id not found');
    res.send(book);
       });   
    
    router.post('/', auth, async(req,res) => {
    const {error,value} = validate(req.body);
    if(error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    
    let genref = await Genre.findById(req.body.genreId);
    if(!genref) return res.status(400).send('Invalid genre');
    let book = new Book({
        title: req.body.title, 
        genre: {_id:genref._id , name:genref.name   },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
     }); 
    book = await book.save();
    res.send(book);
    });   
    
    router.put('/:id', auth, async(req,res) => {
        const {error,value} = validate(req.body);
        if(error){
            console.log(error.details[0].message);
           return res.status(400).send(error.details[0].message);
        }
    let genref = await Genre.findById(req.body.genreId);
    if(!genref) return res.status(400).send('Invalid genre');    
    console.log('Processing put request...');
    let book = await Book.findByIdAndUpdate(req.params.id,{title: req.body.title, genre:{_id:genref._id , name:genref.name}, numberInStock:req.body.numberInStock , dailyRentalRate:req.body.dailyRentalRate });
    book =await Book.findById(req.params.id);
    if(!book)return res.status(404).send('Book with given id not found');
    res.send(book);
        });  
    
    router.delete('/:id',auth ,async(req,res)=>{
    const book = await Book.findByIdAndRemove(req.params.id);
    if(!book)return res.status(404).send('Book with given id not found');
     res.send(book);
    });

    module.exports=router;