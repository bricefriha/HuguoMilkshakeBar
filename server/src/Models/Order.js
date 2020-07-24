import mongoose from "mongoose";
import userModel from "./User.js"

const orderSchema = new mongoose.Schema ({
    NumOrder: {
        type: Number,
        required: true
    },
    Customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    IsCanceled: {
        type: Boolean,
        default: false,
    }


});

orderSchema.statics.getAll = async function (userId) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            return await this.find();
        } else {
            throw 'Only staff members can perform this action';
        }
    } catch (err) {
        throw err;
    }
};



// Exporting the stuff
export default mongoose.model('Order', orderSchema);