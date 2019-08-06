var express = require("express");
var router = express.Router();
var Testimonial = require("../models/testimonials");

var testimonials =[

    
    {
        image: "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        text: "We have often talked about how Dox’s piano skills leaped forward under your teaching. Thank you so much for all that you have done for him!",
        user: "Jodi Cressman",
        relationship: "Piano Parent"

    },
    {
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        text: "Claudia has learned so much this year! Michael always finds great ways to channel her interest and energy!",
        user: "Megan Clipp",
        relationship: "Piano Parent"

    },
    {
        image: "https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        text: "Lisa and I feel blessed that our children have you as their music teacher! You are meticulous, conscientious and dedicated.",
        user: "Enzo Gabrielli",
        relationship: "Piano Parent"

    },
    {
        image: "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        text: "I just wanted to let you know that both Charli and Otto LOVED their piano lessons! More importantly they had fun. Otto said he wants to take them every day until he is 14!",
        user: "Sarah Mahon",
        relationship: "Piano Parent"

    },
    {
        image: "https://images.unsplash.com/photo-1557801200-9a8d901ded2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60 ",
        text: "Michael is an excellent piano teacher, very reliable and meticulous, knowledgeable and efficient. He is very successful and his students like him very much. He is also is a kind, respectful, and brilliant person.",
        user: "Marc Durand",
        relationship: "Teacher"

    },
    {
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        text: "Reading over Dr. Finlay's comments, I was very impressed with his listening. He tempers his comments, but still gets across important points in a very direct, simple and honest way. I think it shows great sensitivity to the students but also gives them things to think about.",
        user: "Douglass Guiles",
        relationship: "Piano Parent"

    }




    
 ]

//index show all testimonials
router.get("/", (req, res)=>{

            res.render("testimonials", {
                testimonials: testimonials
            })
        })

//new pop-up form to create new testimonial

//create-post route to push testimonial to database

//show pop up window showing testimonial

//edit pop-form to edit testimonial

//update put route to update testimonial in db

//destroy remove testimonial

module.exports= router