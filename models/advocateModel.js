const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advocateModel = new Schema({
    name: String,
    age: Number,
    speciality: String,
    exprience: Number,
    rating: Number,
    image: String,
    location: String
});

module.exports = mongoose.model("Advocate", advocateModel);
