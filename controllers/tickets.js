const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  new: newTicket,
  create,
  deleteTicket
};

async function newTicket(req, res) {
  const flightId = req.params.id;
  res.render("tickets/new", {
    title: "New Ticket",
    flightId,
    errorMsg: "",
  });
}

async function create(req, res) {
  try {
      const flightId = req.params.id; // Get the flight's _id from the URL parameters
      const ticketData = req.body; // Get ticket data from the form

      // Add the flight property to the ticketData using the flight's _id
      ticketData.flight = flightId;

      const newTicket = new Ticket(ticketData);
      await newTicket.save();

      res.redirect(`/flights/${flightId}`); // Redirect back to the flight's show view
  } catch (err) {
      console.error(err);
      // Handle the error
  }
}

async function deleteTicket(req, res) {
  try {
    const flightId = req.params.flightId;
    const ticketId = req.params.ticketId;

    // Find the flight and remove the ticket by its ID
    const flight = await Flight.findByIdAndUpdate(
      flightId,
      { $pull: { tickets: ticketId } },
      { new: true }
    );

    if (!flight) {
      res.status(404).send("Flight not found");
      return;
    }

    // Delete the ticket from the Ticket model
    await Ticket.findByIdAndDelete(ticketId);

    res.redirect(`/flights/${flightId}`);
  } catch (err) {
    console.error(err);
    // Handle the error
  }
}
