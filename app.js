const mongoose = require("mongoose");
const ExpressError = require("./utility/ExpressError");
const product = require("./model/product");
const user = require("./model/account");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");

// connect to mongoose
main()
  .then((res) => console.log("connection successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecomm");
}

const userRoute = require("./router/user.js");
const sellerRoute = require("./router/seller.js");

app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/images')));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));

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

app.use(session(sessionConfig));


app.use(userRoute);
app.use(sellerRoute);



app.get("/signup", async (req, res) => {
  res.render("./pages/signup.ejs");
});

app.post("/signup", async (req, res) => {
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

app.get("/login", async (req, res) => {
  res.render("./pages/login.ejs");
});

app.get("/noti", async (req, res) => {
  res.render("./pages/notifiction.ejs");
});

app.all('/*splat',(req, res, next) => {
  next(new ExpressError(404, "Page Not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Some error Occures" } = err;
  res.render("./pages/error.ejs",{message});
});


app.listen(3000, () => {
  console.log("http://localhost:3000");
});