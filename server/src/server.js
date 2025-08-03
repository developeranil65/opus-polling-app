import connectDB from "./db/connect.db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

// Loading env configurations
dotenv.config({
    path: './.env'
})

connectDB() // Database connection call (promise)
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log("Server Error", error);
        throw error;
    })
})
.catch((error) => {
    console.log("MONGODB connection failed !!! ", error);
})