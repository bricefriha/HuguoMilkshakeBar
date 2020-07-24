import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
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
    IsCanceled: {
        type: Boolean,
        default: false,
    }


});

orderSchema.statics.getAll = async function (userId) {

};



// Exporting the stuff
export default mongoose.model('Order', orderSchema);