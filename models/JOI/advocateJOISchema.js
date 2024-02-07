const Joi = require("joi");

const advocateJOISchema = Joi.object({
    advocate: Joi.object({
        name: Joi.string().required().min(3),
        image: Joi.string().required(),
        email: Joi.string().email().required(),
        location: Joi.string().min(3).max(64).required(),
        experience: Joi.number().min(1).max(40).required(),
        speciality: Joi.string().required(),
    }).required(),
});

module.exports = advocateJOISchema;
