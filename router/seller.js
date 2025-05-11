const express = require("express")
const router = express.Router({mergeParams : true});
const product = require('../model/product.js')
const wrapAsync = require("../utility/wrapAsync");

router.get("/seller/home", async (req, res) => {
let data = await product.find({});
  res.render("./pages/seller/home.ejs", { data });
});

router.get("/add_product", (req, res) => {
  res.render("./pages/seller/add");
});

router.post(
  "/add_product",
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
    await data.save();
    res.redirect("/seller/home");
  })
);



router.get("/seller/:id", async (req, res) => {
  const productData = await product.findById(req.params.id);
  res.render("./pages/seller/show.ejs", { productData });
});

router.get("/seller/edit/:id", async (req, res) => {
  const data = await product.findById(req.params.id);
  res.render("./pages/seller/edit.ejs", { data });
});

router.put("/seller/edit/:id", async (req, res) => {
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
  res.redirect("/seller/home");
});

router.delete("/seller/delete/:id", async (req, res) => {
  await product.findByIdAndDelete(req.params.id);
  res.redirect("/seller/home");
});

module.exports = router