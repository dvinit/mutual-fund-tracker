const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const fetchAllMutualFunds  = require('../models/fund');
const Joi = require('joi');



    // Getting all the available mutual funds from rapidAPI for a family
    router.get('/all', auth, async(req, res) => {
        const funds  = await fetchAllMutualFunds(req.body.family);
        res.send(funds);
       });
    
    
    // Fetching the user portfolio
    router.get('/portfolio', auth, async(req, res) => {
        let userPortfolio = [
            {
                fund: 'a-dummy-fund1',
                value: "23455"
            },
            {
                fund: 'a-dummy-fund2',
                value: "1098455" 
            },
            {
                fund: 'a-dummy-fund3',
                value: "76234"
            }
        ];
  
        res.send(userPortfolio);
       });   
    
    
    module.exports=router;