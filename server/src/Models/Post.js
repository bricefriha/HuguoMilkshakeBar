import mongoose from "mongoose";
import userModel from "./User.js";

const postSchema = new mongoose.Schema({
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
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            // Create the new post
            return await this.create({ headline, content });
        } else {
            throw "You're not allowed to perform this action";
        }
    } catch (err) {
        throw err;
    }

}
// Delete a post
postSchema.statics.deletePost = async function (userId, postId) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            // Create the new post
            return await this.deleteOne({ _id: postId });
        } else {
            throw "You're not allowed to perform this action";
        }
    } catch (err) {
        throw err;
    }
}
// Update a post
postSchema.statics.updatePost = async function (userId, postId, fields) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Get the selected post
        const selectedPost = await this.findById(postId);

        // If this post doesn't exist, throw an error
        if (!selectedPost) {
            throw "This post doesn't exist";
        }

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            // Update the object
            Object.assign(selectedPost, fields);

            // Create the new post
            return await selectedPost.save();
        } else {
            throw "You're not allowed to perform this action";
        }
    } catch (err) {
        throw err;
    }
}
// get all posts
postSchema.statics.getAll = async function () {
    try {
        return await this.find();
    } catch (err) {
        throw err;
    }
}
// Exporting the stuff
export default mongoose.model('Post', postSchema);