const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const ticketSchema = new Schema({

    seat: {
        type: String,

        // Validations: 'A1' to 'F99'.
        // This regular expression will match any string that starts with an uppercase letter from A to F, 
        // followed by a digit from 1 to 9, optionally followed by a digit from 0 to 9. 
        // This covers all seat numbers from 'A1' to 'F99'.
        // The ^ character matches the start of the string.
        // The ? character makes the preceding element optional, in this case means the second digit is optional.
        // This allows for seat numbers from 'A1' to 'A9'.
        // The $ character matches the end of the string.
        match: /^[A-F][1-9][0-9]?$/,

        default: null
    },

    price: {
        type: Number,

        // Minimum of 0.
        min: 0,

        default: null
    },

    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },

});

// Compile the schema into a model and export it
module.exports = mongoose.model('Ticket', ticketSchema)