const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advocateModel = new Schema({
    name: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    age: Number,
    email: String,
    speciality: String,
    experience: Number,
    image: {
        type: String,
        default:
            "https://img.freepik.com/free-photo/indian-businessman-with-his-white-car_496169-2889.jpg?size=626&ext=jpg&ga=GA1.1.1079212264.1698405975&semt=sph",
    },
    location: String,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Advocate", advocateModel);
