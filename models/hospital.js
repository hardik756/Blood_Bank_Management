const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Hospitals = mongoose.model("hospital", hospitalSchema);
module.exports = Hospitals;
