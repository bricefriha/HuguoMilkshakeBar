import mongoose from "mongoose";
import userModel from "./User.js"
import { v4 as uuidv5 } from "uuid";

const orderSchema = new mongoose.Schema ({
    numOrder: {
        type: String,
        default: uuidv5().replace(/\-/g, ""),
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    isCanceled: {
        type: Boolean,
        default: false,
    },
    isValidated: {
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
orderSchema.statics.getByCustomer = async function (userId) {
    try {
        
        return await this.find({ customer: userId })
    } catch (err) {
        throw err;
    }
};
// create an order
orderSchema.statics.createOrder = async function (customer) {
    try {
        // get the user who does the action
        return await this.create({ customer });

    } catch (err) {
        throw err;
    }
};



// Exporting the stuff
export default mongoose.model('Order', orderSchema);