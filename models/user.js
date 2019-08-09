const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose")

var UserScehma = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    isAdmin:{type:Boolean, default: false}
});

UserScehma.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserScehma)
