import mongoose from "mongoose";
import userModel from "./User.js";

const pictureSchema = new mongoose.Schema ({
    url: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,

    },
    description: {
        type: String,

    }
});

pictureSchema.statics.savePicture = async function (userId, title, description, url) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            return await this.create({title, description, url});

        } else {
            throw "You're not allowed to perform this action";
        }

    } catch (err) {
        throw err;
    }

}
// Exporting the stuff
export default mongoose.model('Picture', pictureSchema);