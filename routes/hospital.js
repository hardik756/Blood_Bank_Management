const { Router } = require("express");
const Hospitals = require("../models/hospital");
const router = Router();

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  const { name, location } = req.body;
  Hospitals.create({
    name,
    location,
  });
  console.log(req.body);
  return res.redirect("/");
});

module.exports = router;
