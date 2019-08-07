var express = require("express");
var router = express.Router();
var Testimonial = require("../models/testimonials");

var images = [

    //piano
    "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //piano
    "https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //piano
    "https://images.unsplash.com/photo-1542120526-89a7039730ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    
    "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //piano
    "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",

    "https://images.unsplash.com/photo-1557801200-9a8d901ded2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60 ",


]

//index show all testimonials
router.get("/", (req, res) => {
    Testimonial.find({}, (err, allTestimonials) => {
        if (err) {
            console.log(err)
        } else {
            res.render("testimonials/testimonials", { images: images, testimonials: allTestimonials })
        }
    })
})

//new pop-up form to create new testimonial
router.get("/new", (req, res) => {
    res.render("testimonials/new");
})

//create-post route to push testimonial to database
router.post("/", (req, res) => {
    var name = req.body.name
    var relationship = req.body.relationship
    var text = req.body.text
    var newTestimonial = {
        name: name,
        relationship: relationship,
        text: text,
        

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
            res.render("testimonials/show", {testimonial: foundTestimonial, images: images})
        }
    })
})
//edit pop-form to edit testimonial
router.get("/:id/edit", (req,res)=>{
    Testimonial.findById((req.params.id), (err, foundTestimonial)=>{
        if(err){
            console.log(err)
        }else{
            res.render("testimonials/edit",{testimonial: foundTestimonial})

        }
    })
})

//update put route to update testimonial in db
router.put("/:id", (req,res)=>{
    Testimonial.findByIdAndUpdate(req.params.id, req.body.testimonial, (err,updatedTestimonial)=>{
        if(err){
            console.log(err)
            res.redirect("/testimonials")
        }else{
            res.redirect("/testimonials/"+ req.params.id); 
        }
    })
})


//destroy remove testimonial
router.delete("/:id", (req,res)=>{

    Testimonial.findByIdAndRemove(req.params.id, (err)=>{
    if(err){
        res.redirect("/testimonials")
        console.log(err);
    }else{
        res.redirect("/testimonials/")
    }
})
});
module.exports = router