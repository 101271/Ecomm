const express = require("express");
const router = express.Router({ mergeParams: true });
const product = require("../model/product.js");
const wrapAsync = require("../utility/wrapAsync");
const { validateProduct, isLoggedIn, saveReturnTo, is_Seller } = require("../middleware.js");

router.get("/seller/home", isLoggedIn, is_Seller, async (req, res) => {
  let data = await product.find({});
  res.render("./pages/seller/home.ejs", { data });
});

router.get("/add_product", isLoggedIn, is_Seller, (req, res) => {
  res.render("./pages/seller/add");
});

router.post(
  "/add_product",
  isLoggedIn,
  is_Seller,
  validateProduct,
  wrapAsync(async (req, res, next) => {
    let data = new product({
      name: req.body.name,
      image: {
        filename: req.body.filename,
        url: req.body.url,
      },
      owner: req.body.owner,
      description: req.body.description,
      add_product_catagory: req.body.add_product_catagory,
      price: req.body.price,
      rating: req.body.rating,
    });
    await data
      .save()
      .then(() => {
        req.flash("success", "Product Added Successfull");
        res.redirect("/seller/home");
      })
      .catch((err) => {
        next(err);
      });
  })
);

router.get(
  "/seller/:id",
  isLoggedIn,
  is_Seller,
  wrapAsync(async (req, res,next) => {
       const productData = await product.findById(req.params.id);
    if (!productData) {
      req.flash("error", "Product Not Found");
      res.redirect("/seller/home");
    } else {
      res.render("./pages/seller/show.ejs", { productData });
    }
  })
);

router.get("/seller/edit/:id", saveReturnTo, isLoggedIn,  async (req, res) => {
  const data = await product.findById(req.params.id);
  if (!data) {
    req.flash("error", "Product Not found");
    res.redirect("/");
  }else{
    res.render("./pages/seller/edit.ejs", { data });
  }
});

router.put("/seller/edit/:id", isLoggedIn, is_Seller, validateProduct, async (req, res) => {
  await product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    image: {
      filename: req.body.filename,
      url: req.body.url,
    },
    description: req.body.description,
    add_product_catagory: req.body.add_product_catagory,
    price: req.body.price,
  });
  req.flash("success","Product Update Successfull")
  res.redirect("/seller/home");
});

router.delete("/seller/delete/:id", isLoggedIn, async (req, res) => {
  await product.findByIdAndDelete(req.params.id);
  req.flash("success", "Product Delete Successfully");
  res.redirect("/seller/home");
});

module.exports = router;
