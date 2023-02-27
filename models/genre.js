const mongoose = require('mongoose');
const Joi = require('joi');

const genre_schema = Joi.object({
    name : Joi.string().alphanum().min(5).max(50).required()
    });


     function validateGenre(name){
    return genre_schema.validate(name);
    }
    const genreSchema = new mongoose.Schema({
        name: {
        type: String ,
        required: true ,
        minlength: 5 ,
        maxlength: 50
        }
        });

        const Genre = mongoose.model('Genre' , genreSchema);
        exports.genreSchema=genreSchema;
        exports.Genre = Genre;
        exports.validateGenre = validateGenre;       