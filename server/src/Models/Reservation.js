import {Schema} from "mongoose";
import Table from "./Table";

const reservationSchema = new Schema({
    Table: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    Customer: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    Time : {
        type: Date,
        required: true,
    }
})
// Exporting the stuff
module.exports = mongoose.model('Reservation', reservationSchema);