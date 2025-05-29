const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    Total : {
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
                enum: ["0", "4.99", '9.99'],
                default: "0",
            },
            Image: {
                type: String,
                required: true,
            },
        }
    ]
});

const orders = new mongoose.model("orders", orderSchema);
module.exports = orders;