var express = require("express");
var router = express.Router();
var User = require("../models/user")
var middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, (req, res)=>{

    res.render("users/profile")

 })

 router.put("/",(req,res)=>{
     
 })


module.exports = router
