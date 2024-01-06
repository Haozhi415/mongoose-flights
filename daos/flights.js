const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const destinationSchema = require("./destinations");



const flightsSchema = new Schema({
    airline: {
        type: String,
        enum: ['America', 'Canada', 'Alaska', 'Brazil', 'Argentina'],
        default: null
    },

    airport: {
        type: String,
        // enum is used to restrict the values that the airport field can take.
        // If you try to set airport to a value not in the array, Mongoose will throw a validation error.
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },

    flightNo: {
        type: Number,
        // Validations: required, between 10 and 9999.
        // Default value: n/a.
        required: true,
        min: 10,
        max: 9999,
        default: null
    },

    departs: {
        type: Date,
        // Validations: n/a.
        // Default value is 1 year from date of creation.
        default: function () {
            let date = new Date();
            return new Date(date.setFullYear(date.getFullYear() + 1));
        }
    },

    destinations: [destinationSchema],

    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }],

});

// Compile the schema into a model and export it
module.exports = mongoose.model("Flights", flightsSchema);