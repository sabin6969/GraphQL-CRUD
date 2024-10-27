import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            reqired: true,
        },
        hasMacbook: {
            type: Boolean,
            required: true,
        }
    }
);

const User = mongoose.model("Student", userSchema);

export default User;