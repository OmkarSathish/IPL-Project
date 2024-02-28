const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notaryModel = new Schema({
    name: String,
    age: Number,
    email: String,
    location: String,
    experience: Number,
    image: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Notary", notaryModel);
