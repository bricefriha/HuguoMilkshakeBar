import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import { v4 as uuidv4 } from "./node_modules/uuid";



const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        isStaff: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true,
        collection: "users",
    }
);

// Method to create a user
userSchema.statics.createUser = async function (email, firstName, lastName, username, password, isStaff) {
    try {
        var hash;
        // Verify that the username is not already taken
        if (await this.findOne({ username })) {
            throw 'Username "' + username + '" is already taken';
        }
        // Verify that the email adress is not already taken
        if (await this.findOne({ email })) {
            throw 'Email adress "' + email + '" is already taken';
        }
        // hash password
        if (password) {
            hash = bcrypt.hashSync(password, 10);
        }
        // Create a new user using the parameters
        const user = await this.create({ email, firstName, lastName, hash, isStaff });
        
        return user;

    } catch (error) {
        throw error;
    }
};

// Exporting the stuff
export default mongoose.model("User", userSchema);