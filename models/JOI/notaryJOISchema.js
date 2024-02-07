const Joi = require("joi");

const notaryJOISchema = Joi.object({
    notary: Joi.object({
        name: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        experience: Joi.number().min(0).max(30).required(),
        image: Joi.string().min(1).required(),
    }).required(),
});

module.exports = notaryJOISchema;
