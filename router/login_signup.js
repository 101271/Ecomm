const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../model/user_account.js");

router.get("/signup", async (req, res) => {
  res.render("./pages/signup.ejs");
});

router.post("/signup", async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    let error = "Password Didn't Match";
    res.render("./pages/signup.ejs", { error });
  } else {
    const data = new user({
      username,
      email,
      password,
    });
    await data.save();
    req.flash("success", "Account Signup Successfully");
    res.redirect("/login");
  }
});

router.get("/login", async (req, res) => {
  res.render("./pages/login.ejs");
});

router.get("/login_to_home", (req, res) => {
  req.flash("success", "Login Account Successfully");
  res.redirect("/");
});

module.exports = router;
