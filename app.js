const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport = require('passport'),
    semantic = require('semantic')
    LocalStrategy = require('passport-local'),
    methodOverride = require("method-override");

//require routes
indexRoutes = require("./routes/index")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(flash())

app.use("/", indexRoutes);

// mongoose.connect('mongodb://localhost:27017/finlaypianostudio', {
//   useNewUrlParser: true,
//   useCreateIndex: true
// }).then(() => {
//   console.log('Connected to DB');
// }).catch(err => {
//   console.log('ERROR:', err.message)
// });

app.listen(process.env.PORT || 8000,()=>{
    console.log("My name is Frasier Crane, and I am listening!")
})