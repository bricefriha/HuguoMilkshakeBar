import {Schema} from "mongoose";

const orderitemSchema = new Schema ({
    Order: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
        default: 1
    },
    Milkshake: {
        type: Schema.Types.ObjectId, 
        required: true
    }

});

// Exporting the stuff
module.exports = mongoose.model('Orderitem', orderitemSchema);