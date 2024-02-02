const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const establishDBConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE);
        console.log(`${mongoose.connection.name} DataBase Connected!`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = establishDBConnection;
