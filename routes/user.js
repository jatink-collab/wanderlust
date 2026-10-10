const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const collections = require("../collections/user.js");

//signup route
router.route("/signup")
    .get(collections.signupRoute)
    .post(wrapAsync(collections.signupPostRoute));

//login route
router.route("/login")
    .get(collections.loginRoute)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), wrapAsync(collections.loginPostRoute));



//logout route
router.get("/logout", collections.logoutRoute);

module.exports = router;