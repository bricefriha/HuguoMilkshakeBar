import mongoose from "mongoose";
import Table from "./Table.js";

const reservationSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    timeStart : {
        type: Date,
        required: true,
    },
    timeEnd : {
        type: Date,
        required: true,
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    expired: {
        type: Boolean,
        default: false
    },
    canceled: {
        type: Boolean,
        default: false
    }

})

reservationSchema.statics.createRes = async function(tableNum, userId, timeStartRes, timeEndRes) {
    try {
        const selectedTable = await Table.findOne({tableNum});
        const dateStart = new Date(timeStartRes);
        const dateEnd = new Date(timeEndRes);

        if (selectedTable) {
            // Find all reservation starting or ending on the same period
            const reservationOnP = await this.find({ table: selectedTable._id,

                $or:[
                    { 
                        $and: [
                        { timeStart: {$lte: dateStart} },
                        { timeEnd: {$gte: dateStart}  },
                        ]
                    },
                    { 
                        $and: [
                        { timeStart: {$lte: dateEnd} }, 
                        { timeEnd: {$gte: dateEnd}}
                        ]
                    }
                ],
                expired: false,
                canceled: false
            });

            // If there is no reservation we can create one
            if (reservationOnP.length === 0) {
                // Create the reservation
                return await this.create({table: selectedTable, customer: userId, timeStart: dateStart, timeEnd: dateEnd });
            } else {
                throw 'There is already a reservation for this period';
            }
        } else {
            throw 'This table doesn\'t exist';
        }
    } catch (err) {
        throw err;
    }
};
// Exporting the stuff
export default mongoose.model('Reservation', reservationSchema);