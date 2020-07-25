import mongoose from "mongoose";
import userModel from "./User.js";
import orderModel from "./Order.js";
import milkshakeModel from "./Milkshake.js";

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    milkshake: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Milkshake'
    }
});

// Add a milkshake to an order
orderItemSchema.statics.addToOrder = async function (userId, fields) {
    try {

        // get the user who does the action
        const user = await userModel.getById(userId);

        // Get the selected order
        const selectedOrder = await orderModel.findOne({ orderNum: fields.orderNum });

        // if the order doesn't exist
        if (!selectedOrder)
            throw "this order doesn't exist";

        if (user.isStaff || selectedOrder.customer.equals(userId)) {
            // Try to find if there is not already this milkshake in the order
            const existingOrderItem = await this.findOne({ orderId: selectedOrder._id, milkshake: fields.milkshakeId });

            // if so
            if (existingOrderItem) {
                // Add plus one to the quantity
                Object.assign(existingOrderItem, { quantity: fields.quantity ? existingOrderItem.quantity + fields.quantity : ++existingOrderItem.quantity });

                return await existingOrderItem.save();

            } else {
                // Create a new item
                return await this.create({ orderId: selectedOrder._id, milkshake: fields.milkshakeId, quantity: fields.quantity });
            }
        } else {
            throw "You're not allowed to perform this action";
        }
    } catch (err) {
        throw err;
    }
};
// Remove a milkshake to an order
orderItemSchema.statics.removeFromOrder = async function (userId, orderNum, milkshakeId) {
    try {
        // Get the user who does the action
        const user = await userModel.getById(userId);

        // Get the selected order
        const selectedOrder = await orderModel.findOne({ orderNum });

        // if the order doesn't exist
        if (!selectedOrder)
            throw "This order doesn't exist";

        // Verify if the user is allowed to perform the action
        if (user.isStaff || selectedOrder.customer.equals(userId)) {

            // Delete the table
            return await this.deleteOne({ orderId: selectedOrder._id, milkshake: milkshakeId });
        } else {
            throw "You're not allowed to perform this action";
        }


    } catch (err) {
        throw err
    }
}

orderItemSchema.statics.getOrder = async function (userId, orderNum) {
    try {
        // Get the user who does the action
        const user = await userModel.getById(userId);

        // Get the selected order
        const selectedOrder = await orderModel.findOne({ orderNum });

        // if the order doesn't exist
        if (!selectedOrder)
            throw "This order doesn't exist";

        // Verify if the user is allowed to perform the action
        if (user.isStaff || selectedOrder.customer.equals(userId)) {

            // Get all the item of the order
            const items = await this.aggregate([
                {
                    $match: { "orderId": selectedOrder._id }
                }, {
                    $lookup: {
                        from: 'milkshakes',
                        localField: 'milkshake',
                        foreignField: '_id',
                        as: 'ordered_milkshake',
                    }
                }]);

            return {
                orderDetail: selectedOrder,
                items
            }
        } else {
            throw "You're not allowed to perform this action";
        }
    } catch (err) {
        throw err;
    }
}


// Exporting the stuff
export default mongoose.model('Orderitem', orderItemSchema);