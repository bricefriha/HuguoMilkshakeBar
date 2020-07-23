import mongoose from "mongoose";
import userModel from "./User.js"

const tableSchema = new mongoose.Schema ({
    tableNum: {
        type: Number,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false
    }
})

// Create a new table
tableSchema.statics.createTable = async function (userId, tableNum) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            // Verify a table doesn't exist with the same number
            if (await this.findOne({ tableNum })) {
                throw 'Table "' + tableNum + '" already exists';
            }
            // Create a new table using the parameters
            return await this.create({ tableNum });
        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// Get all the tables
tableSchema.statics.getAll = async function () {
    try {
        // Return all the tables
        return await this.find();

    } catch (err) {
        throw err;
    }
    
}
// Delete a table
tableSchema.statics.deleteTable = async function (userId, tableNum) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            // Delete the table
            return await this.deleteOne({tableNum});   
        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// Get all the tables
tableSchema.statics.freeTable = async function (userId, tableNum) {
    try {
        // get the user who does the action
        const user = await userModel.getById(userId);

        // if this user is a staff we can perform the action
        if (user.isStaff) {
            
            // Get the table
            const selectedTable = await this.findOne({ tableNum });

            if (selectedTable) {
                // Update it
                Object.assign(selectedTable, {isFree: !selectedTable.isFree });

                // Save it
                return await selectedTable.save();
            } else {
                throw 'This table doesn\'t exist';
            }

        } else {
            throw 'Only staff members can perform this action'
        }

    } catch (err) {
        throw err;
    }
    
}
// Exporting the stuff
export default mongoose.model('Table', tableSchema);
