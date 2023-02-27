const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const book_schema = Joi.object({
    title : Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock : Joi.number().min(0).required(),
    dailyRentalRate :Joi.number().min(0).required()
    });

     function validateBook(book){
    return book_schema.validate(book);
    }

    const bookSchema = new mongoose.Schema({
        title: {
        type: String ,
        trim: true,
        required: true ,
        minlength: 5 ,
        maxlength: 255
        },
        genre:{
        type: genreSchema,
        required: true
        },
        numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
        },
        dailyRentalRate:{
        type: Number, 
        required: true,
        min: 0,
        max: 255
        }
        });

        const Book = mongoose.model('Book' , bookSchema);
        
        exports.bookSchema=bookSchema;
        exports.Book = Book;
        exports.validate = validateBook;  