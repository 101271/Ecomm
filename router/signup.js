const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../model/user_account.js");
const seller = require("../model/seller_account.js");
const { validation_user_account, saveReturnTo } = require("../middleware.js");
const passport = require("passport");



router.get("/signup", async (req, res) => {
  res.render("./pages/signup.ejs");
});

router.get("/seller/signup", async (req, res) => {
  res.render("./pages/seller_signup.ejs");
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
          req.flash("success", "User's Account Created Successfully");
          res.redirect("/");
        }
      });
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.post("/signup/seller", validation_user_account, async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      let error = "Password Didn't Match";
      res.render("./pages/signup.ejs", { error });
    } else if (password.lenght < 8) {
      let error = "Password is Too short";
      res.render("./pages/signup.ejs", { error });
    } else {
      const data = new seller({
        username,
        email,
      });
      let registerUser = await seller.register(data, password);
      req.login(registerUser, (err) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/seller/signup");
        } else {
          req.flash("success", "Seller's Account Created Successfully");
          res.redirect("/");
        }
      });
    }
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});


module.exports = router;