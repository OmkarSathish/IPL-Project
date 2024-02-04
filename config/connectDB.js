const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const establishDBConnection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://admin:admin@omkarsathish.6pvumep.mongodb.net/IPL_Project?retryWrites=true&w=majority"
        );
        console.log(`${mongoose.connection.name} DataBase Connected!`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = establishDBConnection;
