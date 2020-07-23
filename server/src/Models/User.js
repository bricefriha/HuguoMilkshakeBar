import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from '../config/config.js';
import jwt  from 'jsonwebtoken';

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
            hash = await bcrypt.hashSync(password, 10);
        }
        // Create a new user using the parameters
        const user = await this.create({ email, firstName, lastName, hash, isStaff });

        return user;

    } catch (error) {
        throw error;
    }
};

// Authenticate a user
userSchema.statics.authenticate = async function (email, username, password) {
    try {
        if (email) {
            // Authenticate with email
            var user = await this.findOne({email});

        } else if (username) {
            // Authenticate with username
            var user = await this.findOne({username});
        } else {
            throw 'username or email is missing';
        }
        // Verify the input
        if (user && await bcrypt.compareSync(password, user.hash)) {
            // Create the token
            const token = jwt.sign({ sub: user._id }, config.Secret);
            return {
                email: user.email,
                username: user.username,
                token
    
            }

        }
    } catch (err) {
        throw err;

    }
}
// Get a user by id
userSchema.statics.getById = async function (id) {
    try {
        return this.findOne({ _id: id })
    } catch (err) {
        throw err;
    }
}

// Exporting the stuff
export default mongoose.model("User", userSchema);