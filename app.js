const express = require("express");
const path = require("path");
var cons = require("consolidate");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user");
const HospitalRoute = require("./routes/hospital");

const app = express();
app.engine("html", cons.swig);
app.set("view engine", "html");
app.set("views", path.resolve("./views"));

mongoose
  .connect(
    "mongodb+srv://hardiksharma756:hardik123@cluster0.yi8asgb.mongodb.net/bloodbank"
  )
  .then((e) => console.log("connection to MongoDB successful"))
  .catch((err) => console.log("error connecting to MongoDB"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use("/user", UserRoute);
app.use("/hospital", HospitalRoute);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/centre", (req, res) => {
  res.render("centre");
});
app.get("/history", (req, res) => {
  res.render("history");
});

app.listen(8000, () => {
  console.log("app listening to port 8000");
});
