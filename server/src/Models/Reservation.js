import mongoose from "mongoose";
import Table from "./Table.js";
import userModel from "./User.js"

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
// Get a reservation
reservationSchema.statics.getById = async function (id) {
    return await this.findOne({_id: id });
}
// Create a reservation
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
// Cancel a reservation
reservationSchema.statics.cancel = async function (userId, reservationId) {
    try {
        // Get the current user
        const currentUser = await userModel.getById(userId);

        // Get the reservation to canceled
        const selectedReservation = await this.findById(reservationId);

        // We can cancel it only if the user is a Staff or the user made it
        if (currentUser.isStaff || selectedReservation.customer.equals(userId)) {
            // Cancel the reservation
            Object.assign(selectedReservation, {canceled: true});

            return await selectedReservation.save();
        } else {
            throw 'Sorry you\'re not allowed to perform this action';
        }
     } catch (err) {
         throw err;
     }
    
};
reservationSchema.statics.getAll = async function (){
    try {

        return await this.find();
    } catch (err) {
        throw err;
    }
}
reservationSchema.statics.getByUser = async function (){}
// Exporting the stuff
export default mongoose.model('Reservation', reservationSchema);