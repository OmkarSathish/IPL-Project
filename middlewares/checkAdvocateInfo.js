const ExpressError = require("./ExpressError");
const reviewJOISchema = require("../models/JOI/reviewJOISchema.js");
const advocateJOISchema = require("../models/JOI/advocateJOISchema");

const checkAdvocateInfo = (req, res, next) => {
    const { error } = advocateJOISchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        throw new ExpressError(message, 400);
    }
    next();
};

const validateReview = (req, res, next) => {
    const { error } = reviewJOISchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        throw new ExpressError(message, 400);
    }
    next();
};

module.exports = { checkAdvocateInfo, validateReview };
