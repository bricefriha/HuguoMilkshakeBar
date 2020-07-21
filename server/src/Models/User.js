import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";



const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
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
    Hash: {
        type: String,
        required: true
    },
    IsStaff: {
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

// Exporting the stuff
module.exports = mongoose.model('User', userSchema);