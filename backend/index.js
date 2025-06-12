import express from "express"
import dotenv from "dotenv"
import blogRoutes from "./routes/blogRoutes.js"
import cors from "cors"
import { connectDB } from "./config/db.js";
dotenv.config();
const app=express();



app.use(express.json());
app.use(cors());
app.use("/api/blogs",blogRoutes);


const PORT=process.env.PORT | 5000


app.listen(PORT,()=>{
    console.log("server is running at the port number 5000");
    connectDB();
})