const listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressErroes.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let Listings = await listing.findById(id);
    if (!Listings.owner._id.equals(res.locals.curruser._id)) {
        req.flash("error", "you are not the owner of this listings.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewauthor = async (req, res, next) => {
    let { reviewId, id } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.curruser._id)) {
        req.flash("error", "you are not the author of this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

