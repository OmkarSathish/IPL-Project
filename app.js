const ejs = require("ejs");
const path = require("path");
const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const Advocates = require("./models/advocateModel");
const establishDBConnection = require("./config/connectDB");
const ExpressError = require("./middlewares/ExpressError.js");

establishDBConnection();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/advocates", require("./routes/advocateRoutes.js"));

app.get("/", (req, res) => {
    res.send("./frontend/index.html");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Something went wrong...";
    }
    res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
    console.log(`Serving on http://localhost:${8080}/advocates/all`);
});
