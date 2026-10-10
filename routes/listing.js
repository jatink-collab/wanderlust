const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const collection = require("../collections/listing.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

//index and create listing route
router.route("/")
    .get(wrapAsync(collection.index))
    .post(isLoggedIn, upload.single('Listing[image]'), wrapAsync(collection.createPostRoute));


//create route
router.get("/new", isLoggedIn, collection.createRoute);


//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(collection.editRoute));

//show , delete and upadte route
router.route("/:id")
    .put(isLoggedIn, isOwner, upload.single('Listing[image]'), wrapAsync(collection.updateRoute))
    .delete(isLoggedIn, isOwner, wrapAsync(collection.deleteRoute))
    .get(wrapAsync(collection.showRoute));


module.exports = router;

