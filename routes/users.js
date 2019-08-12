var express = require("express");
var router = express.Router();
var User = require("../models/user")
var middleware = require("../middleware");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter })

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'finlay-piano-studio',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", middleware.isLoggedIn, (req, res)=>{

    res.render("users/profile")

 })

//Edit user profile
 router.put("/:id", upload.single('avatar'), function(req, res){
    User.findById(req.params.id, async function(err, user){
        if(err){
          
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (req.file) {
              try {
              
                  await cloudinary.v2.uploader.destroy(user.imageId);
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                  user.imageId = result.public_id;
                  user.avatar = result.secure_url;
              } 
              catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            if(req.body.email){
              user.email = req.body.email
            }
            user.save();
            req.flash("success","Successfully Updated!");
            res.redirect("/profile");
        }
      })
    });

    //Delete Profile

      

module.exports = router
