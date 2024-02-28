const ejs = require("ejs");
const cors = require("cors");
const path = require("path");
const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv").config();
const session = require("express-session");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const Advocates = require("./models/advocateModel");
const establishDBConnection = require("./config/connectDB");
const ExpressError = require("./middlewares/ExpressError.js");
const User = require("./models/userModel.js");

establishDBConnection();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
    secret: "iplProjectSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));

app.use(passport.session());
app.use(passport.initialize());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    const redirectUrl = req.session.returnTo || '/advocates/all'
    delete req.session.returnTo;
    next()
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use("/advocates", require("./routes/advocateRoutes.js"));

app.use("/users", require("./routes/userRoutes"));

// app.get("/fakeUser", async (req, res) => {
//     const user = new User({
//         email: "omkar@gmail.com",
//         username: "Omkarrrrr",
//     });
//     const newUser = await User.register(user, "chicken");
//     res.send(newUser);
// });

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
    console.log(`Serving on http://localhost:${port}`);
});
