const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [6, "Username is Too Short"],
    maxlength: [25, "Username is Too long"],
  },
  email: {
    type: String,
    required: true,
    minlength: [10, "Email is Too Short"],
    maxlength: [100, "Email is Too long"],
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: [8, "Password is Too Short"],
  //   maxlength: [35, "Password is Too long"],
  // },
});

userSchema.plugin(passportLocalMongoose);

const user_account = new mongoose.model("user", userSchema);
module.exports = user_account;
