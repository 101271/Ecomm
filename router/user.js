const express = require("express");
const router = express.Router({ mergeParams: true });
const product = require("../model/product.js");
const User = require("../model/user_account.js");
const wrapAsync = require("../utility/wrapAsync.js");
const { is_User, isLoggedIn } = require("../middleware.js");
const Cart = require("../model/cart.js");
const Dates = require("../utility/other.js");

router.get("/", async (req, res) => {
  let data = await product.find({});
  res.render("./pages/user/home.ejs", { data });
});

router.get(
  "/lists/:id",
  wrapAsync(async (req, res) => {
    const productData = await product.findById(req.params.id).populate("owner");
    let D_date = Dates();
    if (!productData) {
      req.flash("error", "Product Not found");
      res.redirect("/");
    } else {
      res.render("./pages/user/show.ejs", { productData , date: D_date });
    }
  })
);

router.get("/filter/:id", async (req, res) => {
  const data = await product.find({ add_product_catagory: req.params.id });
  if (data.length == 0) {
    // next(new ExpressError(500,"Not Product Found"))
    let message = "not Product found";
    res.render("./pages/user/home.ejs", { data, message });
  } else {
    res.render("./pages/user/home.ejs", { data });
  }
});

router.get("/add_cart/:id", isLoggedIn, is_User, async (req, res, next) => {
  const id = req.params.id;
  const userData = await User.findById(req.user._id);
  const { Quantity, Delivary_chargers } = req.query;
  const CartData = await new Cart({
    Quantity,
    Delivary_chargers,
    product: id,
  });
  if (!userData) {
    req.flash("error", "User Not found");
    res.redirect("/");
  } else {
    userData.Cart.push(CartData);
    await userData.save();
    await CartData.save();
    req.flash("success", "Product Added to Cart");
    res.redirect("/buy");
  }
});

router.get("/buy", isLoggedIn, is_User, async (req, res) => {
  const userData = await User.findById(req.user._id).populate({path: "Cart", populate: {path: "product"}});
  let D_date = Dates();
  let totalPrice = 0;
  let total_items = 0;
  let Delivary_chargers = 0;
  userData.Cart.forEach((item) => {
    totalPrice += item.product.price * item.Quantity;
    total_items += parseInt(item.Quantity);
    Delivary_chargers += parseFloat(item.Delivary_chargers);
  });
  const Data = await User.findById(req.user._id).populate({
    path: "Cart",
    populate: { path: "product" }, // This will populate the product inside each cart item
  });
  if (!Data) {
    req.flash("error", "User Not found");
    return res.redirect("/");
  }
  console.log(Data);
  res.render("./pages/user/Cart.ejs", { Data, date: D_date , totalPrice , total_items , Delivary_chargers });
});


router.get("/payment", isLoggedIn, is_User, async (req, res) => {
  const userData = await User.findById(req.user._id).populate({path: "Cart", populate: {path: "product"}});
  let totalPrice = 0;
  userData.Cart.forEach((item) => {
    totalPrice += item.product.price * item.Quantity;
  }
  );
  res.render("./pages/user/payment.ejs", {Product : userData.Cart , totalPrice });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "User Logout Successfully");
      res.redirect("/");
    }
  });
});

// under construction api handler
router.get("/working", (req, res) => {
  req.flash("error", "Page is Under Construction");
  res.redirect("/");
});

// notification Api Handler
router.get("/noti", async (req, res) => {
  res.render("./pages/notifiction.ejs");
});


module.exports = router;
