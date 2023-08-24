const Flight = require('../models/flight');

module.exports = {
    create,
};

async function create(req, res, next){
    const id = req.params.id;
    console.log(id)
    
    const flight = await Flight.findById(id);
    flight.destinations.push(req.body);
    
    try {
        await flight.save();
    } catch (err) {
        next(err);
    }

    res.redirect(`/flights/${flight._id}`);
}

