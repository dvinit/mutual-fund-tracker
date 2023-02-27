const auth = require('../middleware/auth');
const {Rental, validate} = require('../models/rental'); 
const {Book} = require('../models/book'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();
Fawn.init("mongodb://127.0.0.1:27017/rentals");

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  if(!rentals)console.log('Issue getting rentals');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send('No such book.');

  if (book.numberInStock === 0) return res.status(400).send('Book not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: book.dailyRentalRate
    }
  });

  rental = await rental.save();
  book.numberInStock--;
  book.save();
  /*try{
  var task=Fawn.Task();
  task.save('rentals',rental)
  .update('books', {_id:book._id},{ $inc: {numberInStock:-1} }).run();
  res.send(rental);
 }
  catch(ex){
  res.status(500).send("Transaction failed");
  }*/
   res.send(rental); 
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 