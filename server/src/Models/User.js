import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";



const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    email: String,
    firstName: String,
    lastName: String,
    Hash: String,
    IsStaff: Boolean

  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Exporting the stuff
module.exports = mongoose.model('User', userSchema);