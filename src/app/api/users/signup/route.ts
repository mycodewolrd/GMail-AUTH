/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        // can add validation
        console.log(reqBody);

        //To check registered user
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "user already exist"},
                {status: 400}
            )
        }

        //To hash password:
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // To save new User:
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //To send verification email:
        await sendEmail({email, emailType:"VERIFY", userId: savedUser.id} )

        // To return response:
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
    
        })

        
    } catch (error: any) {
        return NextResponse.json(
            { error: error.massage },
            { status: 500 }
        )
    }
}