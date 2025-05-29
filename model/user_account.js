const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [6, "Username is Too Short"],
    maxlength: [25, "Username is Too long"],
  },
  email: {
    type: String,
    required: true,
    minlength: [10, "Email is Too Short"],
    maxlength: [100, "Email is Too long"],
  },
  userType: {
    type: String,
    default: "User",
  },
  Cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  Orders: [
    {
      Total: {
        type: Number,
        required: true,
      },
      order_date: {
        type: String,
        default: Date.now,
      },
      Product_Details: [
        {
          name: {
            type: String,
            required: true,
          },
          Quantity: {
            type: Number,
            required: true,
          },
          Price: {
            type: Number,
            required: true,
          },
          Arriving_Date: {
            type: String,
            required: true,
          },
          Delivary_chargers: {
            type: String,
            enum: ["0", "4.99", "9.99"],
            default: "0",
          },
          Image: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const user_account = new mongoose.model("user", userSchema);
module.exports = user_account;
