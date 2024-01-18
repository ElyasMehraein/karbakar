import mongoose from "mongoose"

const connectToDb = async () => {
    try {
        if (mongoose.connection[0].readyState) {
            return true;
        } else {
            await mongoose.connect("mongodb+srv://elyas:Gsk5u4yDaXosRBn5@karbakar.jevgmsf.mongodb.net/?retryWrites=true&w=majority")
            console.log("db connected successfully");
        }


    } catch (err) {
        console.log("connect to db error ", err);
    }
}
export default connectToDb


// const { MongoClient } = require('mongodb')
// const client = new MongoClient("mongodb+srv://elyasmehraein:B0L8AT3RnfGqz5xM@cluster0.tffz0t2.mongodb.net/KarBaKar?retryWrites=true&w=majority")

// async function start() {
//     await client.connect()
//     module.exports = client.db()
//     const app = require('./src/app')
//     app.listen(3000)
// }


// start()