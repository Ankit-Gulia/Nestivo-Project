
const {model} = require("mongoose");

const reviewSchema = require("../Schemas/review.schema");
module.exports = new model("Review", reviewSchema);