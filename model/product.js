const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [5, "Product Name is Too Short"],
    maxlength: [40, "Product Name is Too Long"],
  },
  image: {
    filename: {
      type: String,
      default: "product_image",
    },
    url: {
      type: String,
      set: (v) => v === ""? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWluJTIwaGFsbHxlbnwwfHx8fDE2OTI3NTY5NzE&ixlib=rb-4.0.3&q=80&w=400": v,
    },
  },

  description: {
    type: String,
    required: true,
    minlength: [10, "Product description is Too Short"],
    maxlength: [500, "Product description is Too Long"],
  },

  add_product_catagory: {
    type: String,
    required: true,
    enum: [
      "kitchen",
      "medicines",
      "clothes",
      "gym",
      "mobiles",
      "sounds",
      "jewelleries",
      "shoes",
      "watches",
      "games",
    ],
  },

  price: {
    type: Number,
    required: true,
    min: [1, "Product price is Too low"],
    max: [50000, "Product price is Too high"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
});

const product = new mongoose.model("product", productSchema);
module.exports = product;
