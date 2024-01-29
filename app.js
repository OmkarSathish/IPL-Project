const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const Advocates = require("./models/advocateModel");
const establishDBConnection = require("./config/connectDB");

const app = express();
const port = process.env.PORT || 5001;

establishDBConnection();

app.listen(3000, () => {
    console.log(`Serving on http://localhost:${port}`);
});
