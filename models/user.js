const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("No user Found, please Signup first");
  }
  const userPassword = user.password;
  const salt = user.salt;
  const hashedPassword = bcrypt.hashSync(password, salt);
  if (hashedPassword !== userPassword) {
    throw new Error("Wrong Password, Please try again");
  }
  return user;
});

const User = model("blog", userSchema);
module.exports = User;
