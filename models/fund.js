const axios = require('axios');
const config = require('config');
const url = config.get('x-rapidapi-url') ;
const host = config.get('x-rapidapi-host') ;
const key  = config.get('x-rapidapi-key') ; 


module.exports = async function fetchAllMutualFunds(family){
    let date = new Date(); 
    date.setDate(date.getDate()-1);
    let currDate = date.toISOString().substring(0,10);
    const options = {
        method: 'GET',
        url: url,
        params: {
          Mutual_Fund_Family: family,
          Scheme_Type: 'Open',
          Date: currDate
        },
        headers: {
          'x-rapidapi-key': key,
          'x-rapidapi-host': host 
        }
      };
      
      try {
          const response = await axios.request(options);
          //console.log(response.data);
          return response.data;
      } catch (error) {
          console.error(error);
      }

}

