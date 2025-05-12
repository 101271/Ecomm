const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "product_image",
    },
    url: {
      type: String,
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWluJTIwaGFsbHxlbnwwfHx8fDE2OTI3NTY5NzE&ixlib=rb-4.0.3&q=80&w=400"
          : v,
    },
  },
  owner: {
    type: String,
    default: "owner",
  },

  description: {
    type: String,
  },

  add_product_catagory: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },
});

const product = new mongoose.model("product", productSchema);
module.exports = product;
