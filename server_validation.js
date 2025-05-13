const joi = require("joi");

module.exports.productValidation = joi.object({
  name: joi.string().required().min(5).max(40),
  image: {
    url: joi.string().allow("", null),
    filename: joi.string().allow("", null),
  },
  description: joi.string().required().min(10).max(500),
  price: joi.number().required().min(1).max(50000),
  add_product_catagory: joi.string()
        .valid(
          "kitchen",
          "medicines",
          "clothes",
          "gym",
          "mobiles",
          "sounds",
          "jewelleries",
          "shoes",
          "watches",
          "games"
        )
    .required(),
});

module.exports.user_account_validation = joi.object({
    username : joi.string().min(6).max(25).required(),
    email : joi.string().min(10).max(100).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
    password : joi.string().min(8).max(35).required(),
    confirm_password : joi.string().min(8).max(35).required()
})
