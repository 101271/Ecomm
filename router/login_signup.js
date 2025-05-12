const express = require("express");
const router = express.Router({ mergeParams: true });
const product = require("../model/product.js");

router.get("/signup", async (req, res) => {
  res.render("./pages/signup.ejs");
});

router.post("/signup", async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  console.log(username, email, password, confirm_password);
  if (password !== confirm_password) {
    console.log("password not matched");
    return res.redirect("/signup");
  } else {
    const data = new user({
      username,
      email,
      password,
    });
    await data
      .save()
      .then((res) => console.log("data saved successfully"))
      .catch((err) => console.log(err));
    res.redirect("/login");
  }
});

router.get("/login", async (req, res) => {
  req.flash("success","Login SuccessFully");
  res.render("./pages/login.ejs");
});

module.exports = router;
