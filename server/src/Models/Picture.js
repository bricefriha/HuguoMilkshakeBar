import mongoose from "mongoose";
import userModel from "./User.js";
import fs from 'fs';

const pictureSchema = new mongoose.Schema ({
    url: {
        type: String,
        required: true,
        
    },
    filename: {
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
pictureSchema.statics.getAll = async function () {
    try {
        return await this.find();
    } catch (err) {
        throw err;
    }
}
pictureSchema.statics.savePicture = async function (userId, title, description, url, filename) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            return await this.create({title, description, url, filename});

        } else {
            throw "You're not allowed to perform this action";
        }

    } catch (err) {
        throw err;
    }

}
pictureSchema.statics.deletePicture = async function (userId, pictureId) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            // Get the picture
            const pic = await this.findById(pictureId);

            // Delete it from the server
            fs.unlinkSync('../client/public/images/' + pic.filename);

            return await this.deleteOne({_id: pic._id})

        } else {
            throw "You're not allowed to perform this action";
        }

    } catch (err) {
        throw err;
    }

}
pictureSchema.statics.updatePicture = async function (userId, pictureId, fields) {
    try {
        // get the current user
        const user = await userModel.findById(userId);

        // Verify if the user is allowed to perform the action
        if (user.isStaff) {
            // Get the picture
            const pic = await this.findById(pictureId);

            Object.assign(pic, fields);

            return await pic.save();
        } else {
            throw "You're not allowed to perform this action";
        }

    } catch (err) {
        throw err;
    }

}

// Exporting the stuff
export default mongoose.model('Picture', pictureSchema);