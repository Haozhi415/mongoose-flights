var express = require('express');
var flightsController = require('../controllers/flights')
var ticketsController = require('../controllers/tickets')
var router = express.Router();

/* base path: /flights */
/* GET Flights. */
router.get('/show', flightsController.getAllFlights);

router.post('/create', flightsController.createFlight);

router.post('/:flightNo/destinations', flightsController.addDestination);

router.post('/:flightId/tickets', ticketsController.createTicket);

router.delete('/tickets/delete/:ticketId', ticketsController.deleteTicket);








module.exports = router;