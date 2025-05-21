const express = require("express")
const router = express.Router({mergeParams : true});
const product = require('../model/product.js'); 
const User = require('../model/user_account.js'); 
const wrapAsync = require("../utility/wrapAsync.js");
const {is_User , isLoggedIn} = require('../middleware.js');
const Cart = require("../model/cart.js");
const Dates = require("../utility/other.js")

router.get("/", async (req, res) => {
  let data = await product.find({});
  res.render("./pages/user/home.ejs", { data });
});

router.get("/lists/:id",wrapAsync(async (req, res) => {
  const productData = await product.findById(req.params.id).populate("owner");
  if(!productData){
    req.flash("error","Product Not found");
    res.redirect("/");
  }
  else{
    res.render("./pages/user/show.ejs", { productData });
  }
}));



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

router.get('/add_cart/:id',isLoggedIn, is_User,async(req,res,next)=>{
  const id = req.params.id;
  const userData = await User.findById(req.user._id);
  const {Quantity , Payment_mode} = req.query;
  const CartData = await new Cart({
    Quantity,
    Payment_mode,
    product: id,
  });
  if(!userData){
    req.flash("error","User Not found");
    res.redirect("/");
  }
  else{
    userData.Cart.push(CartData);
    await userData.save();
    await CartData.save();
    req.flash("success", "Product Added to Cart");
    const userData_2 = await User.findById(req.user._id).populate("Cart");
    res.send(userData_2.Cart);
  }
})

router.get('/buy', isLoggedIn, async (req, res) => {
  let D_date = Dates();
  const Data = await User.findById(req.user._id)
    .populate({
      path: 'Cart',
      populate: { path: 'product' } // This will populate the product inside each cart item
    });
  if (!Data) {
    req.flash("error", "User Not found");
    return res.redirect("/");
  }
  console.log(Data.Cart[0]);
  res.render('./pages/user/Cart.ejs', { Data , date : D_date});
});

module.exports = router;