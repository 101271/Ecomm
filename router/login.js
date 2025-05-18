const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require("../model/user_account.js");
const seller = require("../model/seller_account.js");
const { validation_user_account, saveReturnTo } = require("../middleware.js");
const passport = require("passport");


router.get("/login", async (req, res) => {
  res.render("./pages/login.ejs");
});

router.get("/seller/login", async (req, res) => {
  res.render("./pages/seller_login.ejs");
});



router.post(
  "/login_seller",
  saveReturnTo,
  passport.authenticate("seller", {
    failureRedirect: "/seller/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Seller Login Successfully");
    let redirectUrl =  res.locals.returnTo || "/seller/home";
    res.redirect(redirectUrl);
  }
);

router.post(
  "/login_user",
  saveReturnTo,
  passport.authenticate("user", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "User Login Successfully");
    let redirectUrl =  res.locals.returnTo || "/";
    res.redirect(redirectUrl);
  }
);

module.exports = router;
