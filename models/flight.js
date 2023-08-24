const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        required: true,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'BOS']
    },
    arrival: {
        type: Date,
        required: true,
        default: function () {
            return new Date();
        }
    }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United', 'Ethan Airlines']
    },
    airport: {
        type: String,
        required: true,
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
        required: true,
        default: function () {
            return new Date();
        }
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model("Flight", flightSchema);
