import mongoose from "mongoose";

const tableSchema = new mongoose.Schema ({
    NumTable: {
        type: Number,
        required: true,
    },
    IsFree: {
        type: Boolean,
        required: true,
        default: false
    }
})

// Exporting the stuff
module.exports = mongoose.model('Table', tableSchema);
