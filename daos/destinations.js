const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const destinationSchema = new Schema({

    airport: {
        type: String,
        // enum is used to restrict the values that the airport field can take.
        // If you try to set airport to a value not in the array, Mongoose will throw a validation error.
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: null
    },

    arrival: {
        type: Date,
        // Validations: n/a.

        default: null
    },

});


module.exports = destinationSchema;