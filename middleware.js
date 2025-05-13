const { productValidation , user_account_validation } = require("./server_validation");
const ExpressError = require("./utility/ExpressError");

// validate listing before saving or editing
module.exports.validateProduct = (req, res, next) => {
    let result = productValidation.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

module.exports.validation_user_account = (req, res, next) => {
    let result = user_account_validation.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

