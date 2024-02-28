const Joi = require("joi");

const reviewJOISchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().min(3).max(128),
    }).required(),
});

module.exports = reviewJOISchema;
