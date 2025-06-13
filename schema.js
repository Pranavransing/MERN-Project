const Joi = require('joi');
const review = require('./models/review');


module.exports.listingSchema = Joi.object({
    listing :Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        url: Joi.string().uri().optional(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("", null), // <-- THIS IS WRONG
        country: Joi.string().required(),
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});