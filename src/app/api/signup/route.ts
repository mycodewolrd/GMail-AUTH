import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const {username, email. password} = reqBody
        // can add validation
        console.log(reqBody);

        //check register user
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "user already exist"},
                {status: 400}
            )
        }
        


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.massage },
            { status: 500 }
        )
    }
}