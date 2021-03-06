var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user")
var async = require("async");
var crypto = require("crypto");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter })

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'finlay-piano-studio',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({ apiKey: process.env.APIKEY, domain: DOMAIN });
//AUTH Routes
//SHOW REGISTER FORM

router.get("/register", (req, res) => {
    res.render("register");
  })
  
  router.post("/register", upload.single('avatar'), async (req, res) => {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar: User.avatar
    });
    if (req.file) {
     await cloudinary.v2.uploader.upload(req.file.path,
        function (error, result) {
          if (error) {
            req.flash('error', err.message);
            return res.redirect('back');
          } else {
            newUser.avatar = result.secure_url;
          }
        })
    };
    if (req.body.username === "finlayma84") {
      newUser.isAdmin = true
    }
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        req.flash("error", err.message)
        return res.render("register");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to the Finlay Piano Studio, " + req.body.firstname + " " + req.body.lastname + "!")
        res.redirect("/")
      });
    });
  });
  
  
  //LOGIN ROUTES
  
  router.get("/login", (req, res) => {
    res.render("login", { referer: req.headers.referer });
  });
  
  router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
  }), (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
      res.redirect(req.body.referer);
      req.flash("Welcome back, " + req.body.username + "!")
  
    } else {
      res.redirect("/");
      req.flash("Welcome back, " + req.body.username + "!")
  
    }
  });
  
  router.get("/logout", (req, res) => {
    req.logout();
  
  
    res.redirect("/")
  });
//Forgot Password
router.get("/forgot", (req, res) => {
    res.render("forgot");
  })
  
  router.post('/forgot', function (req, res, next) {
    async.waterfall([
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash('error', 'We could not find an account with that email address.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
  
        var mailOptions = {
          to: user.email,
          from: 'mfinlay@pianostudio.com',
          subject: 'Finlay Piano Studio Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        mg.messages().send(mailOptions, function (error, body) {
          console.log(body);
          console.log('mail sent');
          req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(error, 'done');
        });
  
      }
    ], function (err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  
  router.get('/reset/:token', function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', { token: req.params.token });
    });
  });
  router.post('/reset/:token', function (req, res) {
    async.waterfall([
      function (done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if (req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function (err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function (err) {
                req.logIn(user, function (err) {
                  done(err, user);
                });
              });
            })
          } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
          }
        });
      },
      function (user, done) {
  
  
        var mailOptions = {
          to: user.email,
          from: 'mfinlay@pianostudio.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        mg.messages().send(mailOptions, function (error, body) {
          console.log(body);
          console.log('mail sent');
          req.flash('success', 'Success! Your password has been changed.');
          done(error);
        });
      }
    ], function (error) {
      res.redirect('/');
    });
  });
  
  
  module.exports = router
    