var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user")



router.get("/", (req, res) => {
    res.render("index")
});

router.get("/approach", (req, res) => {
    res.render("approach")
});

router.get("/technology", (req, res) => {
    res.render("technology")
});
router.get("/contact", (req, res) => {
    res.render("contact")
});

//AUTH Routes
//SHOW REGISTER FORM

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");

        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/")
        });
    });
});

//LOGIN ROUTES

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local", {

    successRedirect: "/",
    failureRedirect: "/login",

}),

    (req, res) => {
        if (err) {
        }
    })
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("index")
})

module.exports = router

