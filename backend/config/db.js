import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db is connected successfully")

    } catch (error) {

        console.log("erro rin connecting the mongo db");
        process.exit(1);
        
    }
}