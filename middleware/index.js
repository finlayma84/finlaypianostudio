var Testimonial= require("../models/testimonials");
var User = require("../models/user");

// all the middleware goes here
var middlewareObj = {};



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login");
}
middlewareObj.isAdmin = function(req, res, next){
    if(req.user.isAdmin){
        return next();
    }else{
    req.flash("error", "You don't have permission to do that.")
    res.redirect("back");
}
}
middlewareObj.checkTestimonialOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
           Testimonial.findById(req.params.id, function(err, foundTestimonial){
              if(err){
                  req.flash("error", "Testimonial not found.")
                  res.redirect("back");
              }  else {
                if (!foundTestimonial) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                  // does user own the Testimonial?
               if(foundTestimonial.author.id.equals(req.user._id) || req.user.isAdmin) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that.")
   
                   res.redirect("back");
               }
              }
           });
       } else {
           req.flash("error", "You need to be logged in to do that!")
           res.redirect("back");
       }
   }



module.exports = middlewareObj;
