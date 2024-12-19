import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { stringify } from "querystring";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "please provide Username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide Username"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User