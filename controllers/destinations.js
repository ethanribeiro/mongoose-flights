const Flight = require('../models/flight');

module.exports = {
    create,
};

// async function create(req, res, next){
//     try {
//         const id = req.params.id;
//         console.log(id)
    
//         const flight = await Flight.findById(id);
//         console.log(req.body)
//         flight.destinations.push(req.body);
    
//         await flight.save();
//     } catch (err) {
//         next(err);
//     }

//     res.redirect(`/flights/${flight._id}`);
// }

async function create(req, res, next){
    try {
        // const id = req.params.id;
        // console.log(id)
    
        const foundFlight = await Flight.findById(req.params.id);

        const destinationData = {...req.body}

        foundFlight.destinations.push(destinationData)
        // console.log(req.body)
        // flight.destinations.push(req.body);
    
        await foundFlight.save();
    } catch (err) {
        next(err);
    }

    res.redirect(`/flights/${foundFlight._id}`);
}

