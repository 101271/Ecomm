const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    Quantity: {
        type: String,
        default: 1,
    },
    Payment_mode: {
        type: String,
        enum: ["Cash", "Upi",'Credit',"Debit"],
        default: "Cash",
    },
    });

const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;