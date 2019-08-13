var express = require("express");
var router = express.Router();
var Testimonial = require("../models/testimonials");
var middleware = require("../middleware");

var images = [

    "https://images.unsplash.com/photo-1505248207594-9f9912dda70a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    
    "https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1532959801411-cf28447984f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",    //piano

    "https://images.unsplash.com/photo-1542120526-89a7039730ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    
    "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1539789760335-0391b207a0fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

    "../images/pianostairs.jpeg"

]

//index show all testimonials
router.get("/", (req, res) => {
    Testimonial.find({"isApproved": true}, (err, allTestimonials) => {
        if (err) {
            console.log(err)
        } else {
            res.render("testimonials/testimonials", { images: images, testimonials: allTestimonials })
        }
    })
})

//new pop-up form to create new testimonial
router.get("/new",  (req, res) => {
    res.render("testimonials/new");
})

//create-post route to push testimonial to database
router.post("/", (req, res) => {
    var name = req.body.name
    var relationship = req.body.relationship
    var text = req.body.text
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username
    //   }
    var newTestimonial = {
        name: name,
        relationship: relationship,
        text: text,
        // author: author
        

    };

    Testimonial.create(newTestimonial, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/testimonials")
        }
    })

})

//show pop up window showing testimonial
router.get("/:id", (req, res)=>{
    Testimonial.findById(req.params.id, (err, foundTestimonial)=>{
        if(err){
            console.log(err)
        }else{
            if (!foundTestimonial) {
                req.flash("error", "Item not found.");
                return res.redirect("back");
            }
            res.render("testimonials/show", {testimonial: foundTestimonial, images: images})
        }
    })
})

//edit pop-form to edit testimonial
router.get("/:id/edit", middleware.checkTestimonialOwnership, (req,res)=>{
    Testimonial.findById((req.params.id), (err, foundTestimonial)=>{
        if(err){
            console.log(err)
        }else{
            if (!foundTestimonial) {
                req.flash("error", "Item not found.");
                return res.redirect("back");
            }
            res.render("testimonials/edit",{testimonial: foundTestimonial})

        }
    })
})

//update put route to update testimonial in db
router.put("/:id",middleware.checkTestimonialOwnership, (req,res)=>{
    Testimonial.findByIdAndUpdate(req.params.id, req.body.testimonial, (err,updatedTestimonial)=>{
        if(err){
            req.flash("error", err)
            return res.redirect("/testimonials")
        }else{

            }            
            req.flash("success", "Your testimonial has been edited")

            return res.redirect("/testimonials/"+ req.params.id); 
        })
    });



//destroy remove testimonial
router.delete("/:id", middleware.isLoggedIn, (req,res)=>{

    Testimonial.findByIdAndRemove(req.params.id, (err)=>{
    if(err){
        res.redirect("/testimonials")
        console.log(err);
    }else{
            req.flash("error", "Testimonial deleted" )
            return res.redirect("/testimonials");
        }
        res.redirect("/testimonials")
    })
});

module.exports = router