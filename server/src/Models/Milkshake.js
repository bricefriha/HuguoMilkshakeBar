import mongoose from "mongoose";
import userModel from "./User.js";

const milkshakeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    }
});
// Get all milkshakes
milkshakeSchema.statics.getAll = async function () {
    return await this.find();
}
// create a milkshake
milkshakeSchema.statics.createMilkshake = async function (userId, name, image, description, price) {
    try {
        // Get the curent user
        const user = await userModel.findById(userId);

        // Perform the action only if the user is a staff member
        if (user.isStaff) {
            // Create the milkshake
            return await this.create({name, image, description, price});

        } else {
            // Throw an error
            throw 'Your not allowed to perform this action';
        }
    } catch (err) {
        // Throw the specific error
        throw err;
    }
    
}
// Exporting the stuff
export default mongoose.model('Milkshake', milkshakeSchema);