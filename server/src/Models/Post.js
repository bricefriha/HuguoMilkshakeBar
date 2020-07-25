import mongoose from "mongoose";
import userModel from "./User.js";

const postSchema = new mongoose.Schema ({
    headline: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
});
// Create a post
postSchema.statics.createPost = async function (userId, headline, content) {

    // get the current user
    const user = await userModel.findById(userId);

    // Verify if the user is allowed to perform the action
    if (user.isStaff) {
        // Create the new post
        return await this.create({headline, content});
    } else {
        throw "You're not allowed to perform this action";
    }
}
// Exporting the stuff
export default mongoose.model('Post', postSchema);