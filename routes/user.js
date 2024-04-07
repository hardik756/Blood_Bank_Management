const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/", (req, res) => {
  res.render("home.html");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { email, password, fullname } = req.body;
  User.create({
    fullname,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = User.matchPassword(email, password);
  res.redirect("/");
});

module.exports = router;
