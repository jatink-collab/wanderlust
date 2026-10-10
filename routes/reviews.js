const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewauthor, validateReview } = require("../middleware.js");
const collections = require("../collections/review.js");


//Reviews
// Post  Review Route
router.post("/review", isLoggedIn, validateReview, wrapAsync(collections.createReviewRoute));

//Delete Review Route
router.delete("/review/:reviewId", isLoggedIn, isReviewauthor, wrapAsync(collections.deleteReviewRoute));

module.exports = router;