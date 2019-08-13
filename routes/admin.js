var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user")
var Testimonial = require("../models/testimonials")

var images = [

  "https://images.unsplash.com/photo-1505248207594-9f9912dda70a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  
  "https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

  "https://images.unsplash.com/photo-1532959801411-cf28447984f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",    //piano

  "https://images.unsplash.com/photo-1542120526-89a7039730ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  
  "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",

  "https://images.unsplash.com/photo-1539789760335-0391b207a0fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

  "../images/pianostairs.jpeg"

]

//Admin Routes

router.get("/users", middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.find({}, (err, allUsers) => {
      if (err) {
        req.flash("error", err.message)
      } else {
        res.render("admin/users", { users: allUsers })
      }
    })
  
  })

  router.get("/users/:id", middleware.isLoggedIn, middleware.isAdmin, (req, res)=>{

    User.findById(req.params.id,(err, foundUser) =>{
      if(err){
          req.flash("error", err)
      }else{
        res.render("admin/show", {user: foundUser})
      }
    })
  })


  router.delete("/users/:id", middleware.isAdmin, middleware.isLoggedIn, (req,res) =>{
    User.findByIdAndRemove(req.params.id ,(err)=>{
       if(err){
        res.redirect("/users")
  
        req.flash("error", err)
       }else{
         req.flash("error", "User removed from database.")
         return res.redirect("/users")
       }
       res.redirect("/users")
     });
    
  });


  //list unapproved testimonials

  router.get("/approvetestimonial", middleware.isLoggedIn, middleware.isAdmin, (req,res)=>{
    Testimonial.find({"isApproved" : false},(err, allTestimonials)=>{
      if(err){
        req.flash("error", err)
      }else{
        res.render("admin/approvetestimonial", {testimonials: allTestimonials, images: images})
      }
    })
  })

  router.put("/approvetestimonial/:id",middleware.isLoggedIn, middleware.isAdmin, (req,res)=>{
        Testimonial.findByIdAndUpdate(req.params.id, {"isApproved" : true},(err)=>{
          if(err){
            req.flash("error", err)
            return res.redirect("admin/approvetestimonials")
        }else{
          req.flash("success", "Testimonial Approved")
          res.redirect("/approvetestimonial")
      }
    })
  })
  module.exports = router