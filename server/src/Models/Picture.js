import { Schema } from "mongoose";

const pictureSchema = new Schema ({
    Url: {
        type: String,
        required: true,
        
    },
    Title: {
        type: String,
        required: true,

    },
    Description: {
        type: String,
        required: true,

    }
});
// Exporting the stuff
module.exports = mongoose.model('Picture', pictureSchema);