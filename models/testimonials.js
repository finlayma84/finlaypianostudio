var mongoose = require("mongoose");

var testimonialSchema = new mongoose.Schema({
    image: String,
    text: String,
    user: String,
    relationship: String
})

module.exports = mongoose.model("Testimonials")