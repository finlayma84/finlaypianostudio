var mongoose = require("mongoose");

var testimonialSchema = new mongoose.Schema({
    text: String,
    name: String,
    relationship: String,
    author:{
       
        id: {
           type: mongoose.Schema.Types.ObjectId
        },
     
     
        username: String
     }
})

testimonialSchema.index({name: 1})
module.exports = mongoose.model("Testimonials", testimonialSchema)