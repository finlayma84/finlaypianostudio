var express = require("express");
var router = express.Router();






router.get("/", (req, res) => {
  res.render("index")
});

router.get("/approach", (req, res) => {
  res.render("approach")
});

router.get("/technology", (req, res) => {
  res.render("technology")
});
router.get("/contact", (req, res) => {
  res.render("contact")
});

module.exports = router