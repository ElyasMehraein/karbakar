const {MongoClient} = require('mongodb')
const client = new MongoClient ("mongodb+srv://elyasmehraein:B0L8AT3RnfGqz5xM@cluster0.tffz0t2.mongodb.net/KarBaKar?retryWrites=true&w=majority")

async function start(){
    await client.connect()
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
}


start()