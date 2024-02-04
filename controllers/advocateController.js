const mongoose = require("mongoose");
const Advocate = require("../models/advocateModel");
const catchAsync = require("../middlewares/catchAsync");
const ExpressError = require("../middlewares/ExpressError");

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
    const advocate = await Advocate.findById(id);
    // if (!advocate) {
    //     res.status(400);
    //     throw new Error(`Advocate with id: ${id} doesn't exist!`);
    // }
    res.status(200).render("advocate/show", { advocate });
});

// @route POST advocates/add
// @desc register new Advocate
// @access PUBLIC
const addAdvocate = catchAsync((req, res) => {
    res.render("advocate/add");
});

const saveNewAdvocate = catchAsync(async (req, res) => {
    if (!req.body.advocate) {
        throw new ExpressError("Insufficient Data", 400);
    }
    const advocate = new Advocate(req.body.advocate);
    await advocate.save();
    res.redirect(`/advocates/${advocate._id}`);
});

// @route PUT advocates/:id/edit
// @desc rewite an advocate's details
// @access PUBLIC
const editAdvocateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    // if (!advocate) {
    //     res.status(400);
    //     throw new Error(`Advocate with id: ${id} doesn't exist!`);
    // }
    res.status(200).render("advocate/edit", { advocate });
});

const reSaveAdvocateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    // if (!advocate) {
    //     res.status(400);
    //     throw new Error(`Advocate with id: ${id} doesn't exist!`);
    // }
    await Advocate.findByIdAndUpdate(id, { ...req.body.advocate });
    res.redirect(`/advocates/${advocate._id}`);
});

// @route DELETE advocates/:id/
// @desc delete an advocate's profile
// @access PUBLIC
const deleteAdvocateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const advocate = await Advocate.findById(id);
    // if (!advocate) {
    //     res.status(400);
    //     throw new Error(`Advocate with id: ${id} doesn't exist!`);
    // }
    await Advocate.findByIdAndDelete(id);
    res.status(200).redirect("/advocates/all");
});

module.exports = {
    getAllAdvocates,
    getAdvocate,
    addAdvocate,
    saveNewAdvocate,
    editAdvocateProfile,
    reSaveAdvocateProfile,
    deleteAdvocateProfile,
};
