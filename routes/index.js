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
        if(err){
            req.flash("error", err.message)
            return res.render("register");
            }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to the Finlay Piano Studio, "+ user.username + "!")
            res.redirect("/")

        });
    });
});

//LOGIN ROUTES

router.get("/login", (req, res)=> {
    res.render("login", {referer:req.headers.referer});
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
    }), (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
        res.redirect(req.body.referer);
    } else {
        res.redirect("/");
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged you out!")

     res.redirect("/")
 });

module.exports = router

