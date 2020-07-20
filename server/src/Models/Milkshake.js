import {Schema} from "mongoose";

const milkshakeSchema = new Schema ({
    Name: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        
    },
    Description: {
        type: String,
    },
    Price: {
        type: Number,
    }
})

// Exporting the stuff
module.exports = mongoose.model('Milkshake', milkshakeSchema);