const daoFlights = require("../daos/flights");



module.exports = {
    getAllFlights,
    createFlight,
    addDestination,

};

// Get all flights that match the query.
// Included extra experimental function of enabling the user to search for flights via departure and
// destination airports combination.
async function getAllFlights(query) {

    // "conditions" is an array of conditions that will be used to filter the flights.
    // If the user specifies departure and destination airports, the conditions array will contain two objects.
    // If the user specifies only departure or destination airport, the conditions array will contain one object. 
    let conditions = [];

    // if query.airport is not undefined, add the condition { airport: query.airport } to the conditions array.
    if (query.airport) {
        conditions.push({ airport: query.airport });
    }

    // if query.destinationAirport is not undefined, 
    // add the condition { 'destinations.airport': query.destinationAirport } to the conditions array.
    // The condition is an object with a key of 'destinations.airport' and a value of query.destinationAirport.
    // 'destinations.airport' is a string representing the path to a nested property in a Mongoose document. 
    // In this case, nested property refers to the airport field in the destinations subdocument.
    if (query.destinationAirport) {
        conditions.push({ 'destinations.airport': query.destinationAirport });
    }

    // flights defined.
    // flights is an array of flights that match the conditions.
    let flights;

    // If conditions.length has content, find flights that match all the conditions.
    if (conditions.length > 0) {

        // $and is a MongoDB operator that performs a logical AND operation on an array of two or 
        // more expressions and selects the documents that satisfy all the expressions in the array.
        // For example, if conditions is [ { airport: 'LAX' }, { 'destinations.airport': 'SAN' } ], 
        // the find method will return all documents where the airport field is 'LAX' and the airport field 
        // in the destinations subdocument is 'SAN'.
        // find() is a Mongoose method that surely returns an array of documents that match the query criteria.
        flights = await daoFlights.find({ $and: conditions });
    } else {

        // Or else if conditions.length == 0, meaning the user did not specify any conditions, 
        // find all flights according to the normal query.
        flights = await daoFlights.find(query);
    }

    return flights.map(flight => {

        // new Date(flight.departs): It creates a new JavaScript Date object from the departs property 
        // of the flight object. 
        // new Date(): It creates a new JavaScript Date object representing the current date and time.
        // <: It compares the two dates. If the departure date and time is earlier than the current date and time, 
        // it means the flight has already departed, so the result of the comparison is TRUE.
        // The result of the comparison is then stored in the hasDeparted variable.
        const hasDeparted = new Date(flight.departs) < new Date();
        return {
            id: flight._id,
            airline: flight.airline,
            airport: flight.airport,
            flightNo: flight.flightNo,
            departs: flight.departs.toLocaleString(), // format the date/time
            destinations: flight.destinations,

            // If hasDeparted is TRUE, the value of hasDeparted is set to '*'.
            // Otherwise, the value of hasDeparted is set to ''.
            hasDeparted: hasDeparted ? '*' : '',
            tickets: flight.tickets,
        };
    });
}


// Create a new flight.
async function createFlight(flight) {

    // Create is a Mongoose method that creates a new document in the database.
    return await daoFlights.create(flight);
}


// Add a destination to a flight.
async function addDestination(flightNo, destination) {

    // Get the flight with the given flightNo.
    // findOne is a Mongoose method that returns the first document that matches the query criteria.
    const flight = await daoFlights.findOne({ flightNo: flightNo });

    // If the flight doesn't exist.
    if (!flight) {
        return (message = "Flight does not exist.");
    }

    // If the flight exists, add the destination to the flight.
    flight.destinations.push(destination);

    // Save the flight.
    return await flight.save();
}


