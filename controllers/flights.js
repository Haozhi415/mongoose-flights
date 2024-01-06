const modelFlights = require("../models/flights")

module.exports = {
    getAllFlights,
    createFlight,
    addDestination,
};


async function getAllFlights(req, res) {

    // flight here is defined as an array of flights that match the query.
    const flights = await modelFlights.getAllFlights(req.query);

    // Send the flights array to the client.
    res.json({ flights: flights });
}


async function createFlight(req, res) {

    try {

        // flight here is defined as a flight object that is created from the request body.
        const flight = await modelFlights.createFlight(req.body);

        // res.status(201) is the status code for "Created".
        res.status(201).json(flight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }

}


async function addDestination(req, res) {
    try {
        const flightNo = req.params.flightNo;
        const destination = req.body;
        const flight = await modelFlights.addDestination(flightNo, destination);
        res.status(200).json(flight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errorMsg: error.message })
    }
}



