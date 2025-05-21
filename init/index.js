const initData = require('./data.js');
const mongoose = require("mongoose");
const Listing = require("../model/product.js");


main()
.then(res => console.log("connection sucessfully"))
.catch(error => console.log("error in connecting to mongodb",error));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ecomm"); 
}

const loadData = async function(){
   await Listing.deleteMany({});
   console.log("deleted all data");
   initData.data = initData.data.map((item) => ({
         ...item,
         owner : '682e1654a9e2d44a0851f84c'
   }));
   await Listing.insertMany(initData.data)
   console.log("data inserted")
}

loadData();