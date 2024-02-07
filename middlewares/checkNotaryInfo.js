const notaryJOISchema = require("../models/JOI/notaryJOISchema");
const ExpressError = require("./ExpressError");

const checkNotaryInfo = (req, res, next) => {
    const { error } = notaryJOISchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(",");
        throw new ExpressError(message, 400);
    }
    next();
};

module.exports = checkNotaryInfo;
