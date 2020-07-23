import mongoose from "mongoose";
import userModel from "./User.js"

const tableSchema = new mongoose.Schema ({
    numTable: {
        type: Number,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false
    }
})

tableSchema.statics.createTable = async function (userId, numTable) {
    try {
        // get the user who doesn't the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            // Verify a table doesn't exist with the same number
            if (await this.findOne({ numTable })) {
                throw 'Table "' + numTable + '" already exists';
            }
            // Create a new table using the parameters
            return await this.create({ numTable });
        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// Exporting the stuff
export default mongoose.model('Table', tableSchema);
