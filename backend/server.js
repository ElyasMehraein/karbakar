import app from "./app.js"
import mongoose from "mongoose"
import 'dotenv/config'

const port = process.env.PORT;

(async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongo db is connected:)");
})()

app.listen(port,()=>{
    console.log(`we get it on port ${port}`);
})