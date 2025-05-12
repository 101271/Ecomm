const express = require("express")
const router = express.Router({mergeParams : true});
const product = require('../model/product.js')

router.get("/", async (req, res) => {
  let data = await product.find({});
  // let message = "Account login Succesfully"
  let error = ""
  console.log(res.locals.message)
  res.render("./pages/user/home.ejs", { data });
});

router.get("/lists/:id",async (req, res,next) => {
  const productData = await product.findById(req.params.id);
  if(!productData){
    next(new ExpressError(404,"product not Found"))
  }
  else{
    res.render("./pages/user/show.ejs", { productData });
  }
});



router.get("/filter/:id", async (req, res) => {
  const data = await product.find({ add_product_catagory: req.params.id });
  if(data.length==0){
    // next(new ExpressError(500,"Not Product Found"))
    let message = "not Product found";
    res.render("./pages/user/home.ejs", { data, message });
  }
  else{
    res.render("./pages/user/home.ejs", { data });

  }
});

module.exports = router;