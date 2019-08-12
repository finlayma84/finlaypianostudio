var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user")


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
  
  module.exports = router