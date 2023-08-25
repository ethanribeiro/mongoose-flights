const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
        seat: {
            type: String,
            match: /[A-F][1-9]\d?/,
            unique: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        flight: {
            type: Schema.Types.ObjectId,
            ref: 'Flight',
        },
    },
    {
        // meta information about the schema behavior - createAt, updatedAt
        timestamps: true,
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);
