const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer  = require('multer');
const{storage} = require('../cloudConfig.js');
const upload = multer({ storage })

router
.route("/")
  .get( wrapAsync(listingsController.index))
  .post( isLoggedIn , upload.single("listing[image]"),validateListing,
  wrapAsync(listingsController.createListing)
);  


//New Route
router.get("/new", isLoggedIn, listingsController.renderNewForm); 

router
.route("/:id")
  .get( wrapAsync(listingsController.showlistings))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing , wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn,isOwner, wrapAsync(listingsController.deleteListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm)
);


module.exports = router;