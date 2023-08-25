const Flight = require('../models/flight');

module.exports = {
    create,
};

async function create(req, res, next){
    try {
    
        const foundFlight = await Flight.findById(req.params.id);

        const destinationData = {...req.body}

        foundFlight.destinations.push(destinationData)
    
        await foundFlight.save();
        res.redirect(`/flights/${foundFlight._id}`);
    } catch (err) {
        next(err);
    }

}
