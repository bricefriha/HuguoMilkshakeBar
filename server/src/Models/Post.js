import {Schema} from "mongoose";

const postSchema = new Schema ({
    Content: {
        type: String,

    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
});

// Exporting the stuff
module.exports = mongoose.model('Post', postSchema);