const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const Advocates = require("./models/advocateModel");
const establishDBConnection = require("./config/connectDB");

establishDBConnection();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/advocates", require("./routes/advocateRoutes.js"));

app.listen(3000, () => {
    console.log(`Serving on http://localhost:${port}/advocates`);
});
