const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    User = require("./models/user")
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require("method-override"),
    ejsLint= require("ejs-lint");

//require routes
indexRoutes = require("./routes/index")
testimonialRoutes = require("./routes/testimonials")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(flash())
app.use(require("express-session")({
  secret: "Moopy",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error")
  res.locals.success=req.flash("success")
  next();
});

app.use("/", indexRoutes);
app.use("/testimonials", testimonialRoutes)

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to DB');
}).catch(err => {
  console.log('ERROR:', err.message)
});


app.listen(process.env.PORT || 8000,()=>{
    console.log("My name is Frasier Crane, and I am listening!")
})