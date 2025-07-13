const mongoose = require("mongoose")
require('dotenv').config()

const ConnectToMongo = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Connected to mongoDB SuccessFully!");
        })
    } catch (error) {
        console.log("MongoDB Connection EROOR: ", error)
    }
}

module.exports = ConnectToMongo;