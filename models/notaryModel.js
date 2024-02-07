const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notaryModel = new Schema({
    name: String,
    age: Number,
    email: String,
    location: String,
    experience: Number,
    rating: Number,
    image: String,
});

module.exports = mongoose.model('Notary', notaryModel)