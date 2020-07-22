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
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },

})

reservationSchema.statics.CreateRes = async function(tableNum, userId, time) {

};
// Exporting the stuff
module.exports = mongoose.model('Reservation', reservationSchema);