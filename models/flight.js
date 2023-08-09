const mongoose = require('mongoose');
const flights = require("../controllers/flights");

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', 'Ethan Airlines']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS'],
        default: 'BOS'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            let nextYearDate = new Date();
            return nextYearDate.setFullYear(nextYearDate.getFullYear()+1);
        }
    }
}, {
    timestamps: true
});

function getAll() {
    return flights
}

module.exports = mongoose.model("Flight", flightSchema);

module.export = {
    getAll
};