import {Schema} from "mongoose";

const orderSchema = new Schema ({
    NumOrder: {
        type: Number,
        required: true
    },
    Customer: {
        type: Schema.Types.ObjectId,
        required: true
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },


})

// Exporting the stuff
module.exports = mongoose.model('Order', orderSchema);