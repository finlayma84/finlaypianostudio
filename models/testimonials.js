var mongoose = require("mongoose");

var testimonialSchema = new mongoose.Schema({
    text: String,
    name: String,
    relationship: String
})

testimonialSchema.index({name: 1})
module.exports = mongoose.model("Testimonials", testimonialSchema)