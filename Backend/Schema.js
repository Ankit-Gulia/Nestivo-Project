const joi = require('joi');

const propertySchema = joi.object({
    title : joi.string().required(),
    description : joi.string().required(),
    price : joi.number().required().min(0),
    location : joi.string().required(),
    country : joi.string().required(),
    image : joi.object(),
});

module.exports = propertySchema;

