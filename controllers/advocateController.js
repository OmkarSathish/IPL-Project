const mongoose = require("mongoose");
const Advocate = require("../models/advocateModel");
const Review = require("../models/reviewModel");
const catchAsync = require("../middlewares/catchAsync");
const ExpressError = require("../middlewares/ExpressError");
const { message } = require("../models/JOI/reviewJOISchema");
const { storeReturnTo } = require("../middlewares/isLoggedIn");

// @route GET advocates/all
// @desc shows all advocates
// @access PUBLIC
const getAllAdvocates = catchAsync(async (req, res) => {
    const advocates = await Advocate.find({});
    res.status(200).render("advocate/index", { advocates });
});

// @route GET advocates/:id
// @desc shows advocate with :id
// @access PUBLIC
const getAdvocate = catchAsync(async (req, res) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    console.log(advocate);
    res.status(200).render("advocate/show", { advocate });
});

// @route POST advocates/add
// @desc register new Advocate
// @access PUBLIC
const addAdvocate = catchAsync((req, res) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        throw new ExpressError("You need to be logged in to add a profile");
    }
    res.render("advocate/add");
});

const saveNewAdvocate = catchAsync(async (req, res) => {
    const advocate = new Advocate(req.body.advocate);
    advocate.author = req.User._id;
    await advocate.save();
    res.redirect(`/advocates/${advocate._id}`);
});

// @route PUT advocates/:id/edit
// @desc rewite an advocate's details
// @access PUBLIC
const editAdvocateProfile = catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        throw new ExpressError("You need to be logged in to add a profile");
    }
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    res.status(200).render("advocate/edit", { advocate });
});

const reSaveAdvocateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    await Advocate.findByIdAndUpdate(id, { ...req.body.advocate });
    res.redirect(`/advocates/${advocate._id}`);
});

// @route DELETE advocates/:id/
// @desc delete an advocate's profile
// @access PUBLIC
const deleteAdvocateProfile = catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        throw new ExpressError("You need to be logged in to add a profile");
    }
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    await Advocate.findByIdAndDelete(id);
    res.status(200).redirect("/advocates/all");
});

// @route POST advocates/:id/
// @desc give an advocate a review
// @access PUBLIC
const giveReview = catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        throw new ExpressError("You need to be logged in to add a profile");
    }
    const advocate = await Advocate.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    advocate.reviews.push(review);
    await review.save();
    await advocate.save();
    res.redirect(`/advocates/${advocate._id}`);
});

// @route DELETE advocates/:id/reviews/:reviewId
// @desc delete an advocate's review
// @access PUBLIC
const removeReview = catchAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        throw new ExpressError("You need to be logged in to add a profile");
    }
    const { id, reviewId } = req.params;
    console.log(id, reviewId);
    await Advocate.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/advocates/${id}`);
});

module.exports = {
    getAllAdvocates,
    getAdvocate,
    addAdvocate,
    saveNewAdvocate,
    editAdvocateProfile,
    reSaveAdvocateProfile,
    deleteAdvocateProfile,
    giveReview,
    removeReview,
};
