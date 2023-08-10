const Flight = require("../models/flight");

module.exports = {
    index,
    new: newFlight
};

async function index(req, res, next) {
    const results = await Flight.find({}); // db call -> promised fullfilled
    console.log(results);
    res.render("index", { title: 'test', flights: results});
}

function newFlight(req, res) {
    res.render("new", { title: "Add Flight", errorMsg: "" });
  }