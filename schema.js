const joi = require("joi");

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        Comment: joi.string().required()
    }).required()
});