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
    Delivary_chargers: {
        type: String,
        enum: ["0", "4.99",'9.99'],
        default: "Cash",
    },
    });

const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;