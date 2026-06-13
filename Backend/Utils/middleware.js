
const propertyModel = require('../Models/property.model.js');
const reviewModel = require('../Models/review.model.js');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model.js');
const propertySchema = require('../Schema.js');


module.exports.validateListing = (req,res,next) => {
    const { error } = propertySchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new Error(406, msg));
    }
    next()
}

module.exports.wrapAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
} 


module.exports.isOwner = async (req, res, next) => {
    const property = await propertyModel.findById(req.params.id);
    if(!req?.user?._id.equals(property?.owner?._id)){
      return res.status(406).json({message : "You'r not the owner of the property"});
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
     let {id, rev_id} = req.params;
    const review = await reviewModel.findById(rev_id);
    if(!req.user._id.equals(review.author._id)){
      return res.status(406).json({message : "You'r not the author of the review"});
    }
    next();
};


module.exports.isLoggedIn = async(req, res, next) => {
  const token = req.cookies.token;
    if (!token) return res.status(401).json({message: "Not authenticated"});
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      req.user = user;
    } catch (err) {
      return res.status(401).json({message: "Invalid token", isAuthenticated: false});
    }
  next();
}



