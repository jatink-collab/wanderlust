const Review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.createReviewRoute = async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();
    req.flash("success", "Add new review ");

    res.redirect(`/listings/${Listing._id}`);
};

module.exports.deleteReviewRoute = async (req, res) => {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review `s deleted!");

    res.redirect(`/listings/${id}`);
};