/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // console.log(reqBody);

        // To check User's existence:
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        // To check password validation:
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        // To create token data:
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // To create token:
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        // To send Res:
        const response = NextResponse.json(
            {
                massage: "LoggedIn successfully",
                success: true,
            },
            { status: 200 }
        );
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        console.error("Error in login route: ", error);
        
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};
