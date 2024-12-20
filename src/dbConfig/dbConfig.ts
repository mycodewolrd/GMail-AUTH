import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on("connection", () => {
            console.log("MongoDB connected");
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error, please make sure db is append running " + err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connecting DB");
        console.log(error);
        
    }
}