const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "User must provie a name!!"],
  },
  email: {
    type: String,
    require: [true, "User must provide an email!!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!!"],
    lowercase: true,
  },
  photo: String,
  password: {
    type: String,
    require: [true, "User must provide a password"],
    minlength: 8,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords must be match!!",
    },
  },
  passwordConfirm: {
    type: String,
    require: [true, "User must confirm their password "],
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  this.passwordConfirm = undefined;
   next()
});
const User = mongoose.model("User", userSchema);
module.exports = User;
