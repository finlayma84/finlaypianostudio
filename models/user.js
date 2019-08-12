const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose")

var UserScehma = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin:{type:Boolean, default: false},
    avatar: {type: String, default: "../images/default-user-icon-14.jpg"},
    imageId: {type: String, default: "DEFAULT_IMAGEID"}
});

UserScehma.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserScehma)
