const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

async function index(req, res, next) {
    try {
        const results = await Flight.find({}); // db call -> promised fullfilled
        console.log(results);
        res.render("flights/index", { title: 'Flights', flights: results});
    } catch (err) {
        console.log(err.message);
        res.redirect("/");
    }
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the min and max of flightNo input
    const fnMin = Flight.schema.path('flightNo').options.min;
    const fnMax = Flight.schema.path('flightNo').options.max;
    // Obtain the default date
    const dt = newFlight.departs;
    let departsDate = `${(dt.getFullYear())}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate, fnMin, fnMax, title: "Add Flight", errorMsg: "" });
}

async function create(req, res) {
    const flightData = { ...req.body };
    try {
        const createdFlight = await Flight.create(flightData);
        // console.log("Made it!")
        res.redirect(`flights/${createdFlight._id}`);
    } catch (err) {
        console.log(err);
        res.render("flights/new", { errorMsg: err.message });
    }
}

async function show(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id)
        const flight = await Flight.findById(id);
        console.log(Flight);

        const dt = flight.departs;
        let arrivalDate = `${(dt.getFullYear())}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;

        const tickets = await Ticket.find({flight: flight._id})

        console.log(tickets)

        res.render("flights/show", {
            title: "Flight Detail",
            flight,
            arrivalDate,
            tickets
        });

    } catch (err) {
        console.log(err);
        next(Error(err));
    }
}