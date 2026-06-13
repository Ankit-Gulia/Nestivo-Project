
const propertyModel = require('../Models/property.model');
const reviewModel = require('../Models/review.model');

module.exports.addReview = async (req, res) => {
    const property = await propertyModel.findById(req.params.id);
    const review = await reviewModel.create({
        ...req.body,
        author: req.user._id
    });
    property.reviews.push(review);
    await property.save();
    const populatedReview = await review.populate('author');

    res.json({
        message: "Review added",
        response: populatedReview
    });
};



module.exports.deleteReview = async (req, res) => {
    let { id, rev_id } = req.params;
    await propertyModel.findByIdAndUpdate(id, { $pull: { reviews: rev_id } });
    await reviewModel.findByIdAndDelete(rev_id);
    res.json({ message: "Review Deleted" });
};