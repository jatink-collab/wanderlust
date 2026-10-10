const User = require("../models/user.js");

module.exports.signupRoute = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupPostRoute = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email, username
        });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginRoute = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginPostRoute = async (req, res) => {
    req.flash("success", "welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutRoute = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("you are logged out !");
        res.redirect("/listings");
    }
    )
};