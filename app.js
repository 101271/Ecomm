const mongoose = require("mongoose");
const ExpressError = require("./utility/ExpressError");
const product = require("./model/product");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const flash = require('connect-flash');


// connect to mongoose
main()
  .then((res) => console.log("connection successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecomm");
}


// require Routes
const userRoute = require("./router/user.js");
const sellerRoute = require("./router/seller.js");
const Login_signup_Route = require("./router/login_signup.js");



// Setting middlewares
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/images')));


// Setting Engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", ejsMate);



// session middleware
const sessionConfig = {
  secret: "Mycode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// Setting Session and Flash
app.use(session(sessionConfig));
app.use(flash());


// Setting local varibale in response
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

// use Routes
app.use(userRoute);
app.use(sellerRoute);
app.use(Login_signup_Route);


// under construction api handler
app.get("/working",(req,res)=>{
  req.flash("error","Page is Under Construction");
  res.redirect("/");
})


// notification Api Handler
app.get("/noti", async (req, res) => {
  res.render("./pages/notifiction.ejs");
});


// if no Rounts match 
app.all('/*splat',(req, res, next) => {
  next(new ExpressError(404, "Page Not found"));
});


// Custom Error Handle
app.use((err,req, res, next) => {
  let { statusCode = 500, message = "Some error Occures" } = err;
  res.render("./pages/error.ejs",{message});
});

// Listing Port
app.listen(3000, () => {
  console.log("http://localhost:3000");
});