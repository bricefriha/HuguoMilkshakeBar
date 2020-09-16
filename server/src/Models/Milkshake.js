import mongoose from "mongoose";
import userModel from "./User.js";

const milkshakeSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    picture:{
        type: String
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
    try {
        return await this.aggregate({
            $lookup: {
                from: 'pictures',
                localField: 'picture',
                foreignField: '_id',
                as: 'picture',
            }
        });
    } catch (err) {
        throw err;
    }
}
// create a milkshake
milkshakeSchema.statics.createMilkshake = async function (userId, name, picture, description, price) {
    try {
        // Get the curent user
        const user = await userModel.findById(userId);

        // Perform the action only if the user is a staff member
        if (user.isStaff) {
            // Create the milkshake
            return await this.create({name, picture, description, price});

        } else {
            // Throw an error
            throw 'Your not allowed to perform this action';
        }
    } catch (err) {
        // Throw the specific error
        throw err;
    }
    
}
// create a milkshake
milkshakeSchema.statics.deleteMilkshake = async function (userId, milkshakeId) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            // Delete the table
            return await this.deleteOne({_id: milkshakeId});   
        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// create a milkshake
milkshakeSchema.statics.updateMilkshake = async function (userId, milkshakeId, fields ) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            // Select the milkshake
            const selectedMilkshake = await this.findById(milkshakeId);
            // Update it
            Object.assign(selectedMilkshake, fields);

            // Save it
            return await selectedMilkshake.save();  
        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// Exporting the stuff
export default mongoose.model('Milkshake', milkshakeSchema);