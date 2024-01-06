const daoFlights = require("../daos/flights");
const daoTickets = require("../daos/tickets");

module.exports = {
    createTicket,
    deleteTicket,
};

// Create a ticket for a flight via the flight's ID.
// flightId is req.params.flightId from conrollers.
// ticketData is req.body from controllers.
async function createTicket(flightId, ticketData) {

    // First find the flight with the given ID
    // The result is stored in the "flight" variable.
    const flight = await daoFlights.findById(flightId);

    // If "flight" returns null, means the flight does not exist.
    if (!flight) {
        return (message = "Flight does not exist.");
    }

    // If "flight" returns truthy, means the flight exists.
    // Then create a new ticket with the provided data.
    const ticket = await daoTickets.create({
        seat: ticketData.seat,
        price: ticketData.price,
        flight: flightId
    });

    // Next the following adds the _id of the newly created ticket to the flight's tickets array.
    // push is a Mongoose method that adds an item to an array.
    flight.tickets.push(ticket._id);

    // After pushing the ticket to the flight's tickets array, save the updated flight.
    await flight.save();

    // Return the newly created ticket
    return ticket;
}


// Delete a ticket via the ticket's ID.
async function deleteTicket(ticketId) {

    // First find the ticket with the given ID.
    const ticket = await daoTickets.findById(ticketId);

    // If "ticket" returns null, means the ticket does not exist.
    // Else, delete the ticket.
    if (!ticket) {
        return (message = "Ticket does not exist.");
    } else {
        await daoTickets.findByIdAndDelete(ticketId);
    }

    // Find the flight with the given ticketId.
    // The result is stored in the "flight" variable.
    const flight = await daoFlights.findOne({ tickets: ticketId });

    // If "flight" returns null, means the flight does not exist.
    // Else, delete the ticket from the flight's tickets array.
    if (!flight) {
        return (message = "Ticket does not exist.");
    } else {

        // Remove the ticketId from the flight's tickets array.
        // pull is a Mongoose method that removes an item from an array.
        flight.tickets.pull(ticketId);

        // After removing the ticketId from the flight's tickets array, save the updated flight.
        await flight.save();
    }

    return (message = "Ticket deleted.");
}