const mongoose = require("mongoose");
const ExpressError = require("./utility/ExpressError");
const product = require("./model/product");
const user = require("./model/account");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");
const wrapAsync = require("./utility/wrapAsync");

// connect to mongoose
main()
  .then((res) => console.log("connection successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecomm");
}

app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/css"));
app.use(express.static("public/js"));
app.use(express.static("public/images"));

app.set("view engine", "ejs");
app.set("views", "./views");
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



app.get("/", async (req, res) => {
  let data = await product.find({});
  res.render("./pages/user/home.ejs", { data });
});

app.get("/lists/:id", async (req, res) => {
  const productData = await product.findById(req.params.id);
  res.render("./pages/user/show.ejs", { productData });
});

app.get("/seller/home", async (req, res) => {
  let data = await product.find({});
  res.render("./pages/seller/home.ejs", { data });
});

app.get("/add_product", (req, res) => {
  res.render("./pages/seller/add");
});

app.post(
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

app.get("/filter/:id", async (req, res) => {
  const data = await product.find({ add_product_catagory: req.params.id });
  res.render("./pages/user/home.ejs", { data });
});

app.get("/seller/:id", async (req, res) => {
  const productData = await product.findById(req.params.id);
  res.render("./pages/seller/show.ejs", { productData });
});

app.get("/seller/edit/:id", async (req, res) => {
  const data = await product.findById(req.params.id);
  res.render("./pages/seller/edit.ejs", { data });
});

app.put("/seller/edit/:id", async (req, res) => {
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

app.delete("/seller/delete/:id", async (req, res) => {
  await product.findByIdAndDelete(req.params.id);
  res.redirect("/seller/home");
});

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
  res.status(statusCode).send(message);
  // res.sendStatus(statusCode);
});


app.listen(3000, () => {
  console.log("http://localhost:3000");
});