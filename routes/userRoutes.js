const express = require("express");
const User = require("../models/userModel");
const catchAsync = require("../middlewares/catchAsync");
const router = express.Router();
const passport = require("passport");
const { storeReturnTo } = require("../middlewares/isLoggedIn");

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post(
    "/register", storeReturnTo,
    catchAsync(async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const user = new User({ email, username });
            const regUser = await User.register(user, password);
            req.login(regUser, function (err) {
                if (err) {
                    next(err);
                }
            });
        } catch (e) {
            console.log(e.message);
            res.redirect("/users/register");
        }
        res.redirect("/advocates/all");
    })
);

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post(
    "/login",
    storeReturnTo,
    passport.authenticate("local"),
    (req, res) => {
        const redirectUrl = res.locals.returnTo || "/advocates/all";
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
