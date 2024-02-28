const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

userModel.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userModel);
