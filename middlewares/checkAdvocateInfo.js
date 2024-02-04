const advocateJOISchema = require("../models/advocateJOISchema");
const ExpressError = require("./ExpressError");

const checkAdvocateInfo = (req, res, next) => {
    const { error } = advocateJOISchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        throw new ExpressError(message, 400);
    }
    next();
};

module.exports = checkAdvocateInfo;
