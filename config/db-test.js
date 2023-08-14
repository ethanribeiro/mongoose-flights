//  connection string - .env
require('dotenv').config();

// db - connection
require('./database');

// import model 
const Flight = require('../models/flight');

function createFlight(data) {
  Flight.create(data)
    .then(newFlight => console.log(newFlight))
    .catch(err => console.log(err));
}

const testData = {
  airline: 'Ethan Airlines',
  iata: 'BOS',
  flightNo: 1914,
}
// testing database seeding
console.log('trying to create flight data');
createFlight(testData);