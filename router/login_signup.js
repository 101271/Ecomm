const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../model/user_account.js");
const { validation_user_account } = require("../middleware.js");
const passport = require("passport");

router.get("/signup", async (req, res) => {
  res.render("./pages/signup.ejs");
});

router.post("/signup", validation_user_account, async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      let error = "Password Didn't Match";
      res.render("./pages/signup.ejs", { error });
    } else if (password.lenght < 8) {
      let error = "Password is Too short";
      res.render("./pages/signup.ejs", { error });
    } else {
      const data = new user({
        username,
        email,
      });
      let registerUser = await user.register(data, password);
      req.login(registerUser, (err) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/signup");
        } else {
          req.flash("success", "Account Created Successfully");
          res.redirect("/");
        }
      });
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.get("/login", async (req, res) => {
  res.render("./pages/login.ejs");
});

router.post(
  "/login_to_home",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Login Account Successfully");
    res.redirect("/");
  }
);

module.exports = router;
