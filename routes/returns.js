const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const moment = require('moment');
const { Book } = require('../models/book');

router.post('/',auth, async(req, res) => {
    if(!req.body.customerId)res.status(400).send('customerId not provided');
    if(!req.body.bookId)res.status(400).send('bookId not provided');

    const rental = await Rental.findOne({
        'customer._id':req.body.customerId,
        'book._id' : req.body.bookId
    });

    if(!rental) return res.status(404).send('Rental not found');
    if(rental.dateReturned)return res.status(400).send('Rental already processed');
    rental.dateReturned=new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee = rentalDays * rental.book.dailyRentalRate;
await rental.save();

await Book.updateOne(
{_id: rental.book._id }, {
$inc : { numberInStock : 1 }
});
res.status(200).send('Rental return has been processed!');
   });
   module.exports = router;