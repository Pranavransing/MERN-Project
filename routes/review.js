const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const Listing = require("../models/listings");
const { validateReview,isLoggedIn,isReviweAuthor } = require("../middleware");

const reviewsController = require("../controllers/reviews.js");

//Post Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsController.createReview)
);

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviweAuthor, wrapAsync(reviewsController.deleteReview)
);

module.exports = router;