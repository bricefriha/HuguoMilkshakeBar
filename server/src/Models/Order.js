import mongoose from "mongoose";
import userModel from "./User.js"
import { v4 as uuidv5 } from "uuid";
import e from "express";

const orderSchema = new mongoose.Schema ({
    orderNum: {
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
// get an order by user
orderSchema.statics.getByCustomer = async function (userId) {
    try {
        
        return await this.find({ customer: userId })
    } catch (err) {
        throw err;
    }
};
// Cancel an order
orderSchema.statics.cancelOrder = async function (userId, orderNum ) {
    try {
        console.log(orderNum);
        // Select the order to cancel
        const selectedOrder = await this.findOne({ orderNum });

        // if the order exist
        if (selectedOrder) {
            
            // get the user who does the action
            const user = await userModel.getById(userId);

            // The action can be perform only if the user is a staff member
            // or created the order
            if (user.isStaff || selectedOrder.customer.equals(userId)) {

                // Switch isCancel attribut
                Object.assign(selectedOrder, { isCanceled: true});

                return await selectedOrder.save();
            } else {
                throw 'Sorry you\'re not allowed to perform this action';
            }
        } else  {
            throw 'We don\'t find the order';
        }
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