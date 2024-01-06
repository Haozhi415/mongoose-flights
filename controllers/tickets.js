const modelTickets = require('../models/tickets');

module.exports = {
    createTicket,
    deleteTicket,
};

// Create a ticket for a flight via the flight's ID.
async function createTicket(req, res) {
    try {
        const ticket = await modelTickets.createTicket(req.params.flightId, req.body);

        // res.status(201) is the status code for "Created".
        res.status(201).json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}

// Delete a ticket via the ticket's ID.
async function deleteTicket(req, res) {
    try {
        await modelTickets.deleteTicket(req.params.ticketId);

        // res.status(200) is the status code for "OK".
        res.status(200).json(message = "Ticket deleted.");
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}