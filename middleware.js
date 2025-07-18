const { productValidation , user_account_validation } = require("./server_validation");
const ExpressError = require("./utility/ExpressError");

// validate listing before saving or editing
// this is used in add_product
//   req.flash("error", "Product Not Found");
module.exports.validateProduct = (req, res, next) => {
    let result = productValidation.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

// validate user account before saving or editing
// this is used in signup
module.exports.validation_user_account = (req, res, next) => {
    let result = user_account_validation.validate(req.body);
    if (result.error) {
      let errMsg = result.error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You need to be logged in to do that");
    return res.redirect("/login");
  }
  next();
}


module.exports.saveReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
}

module.exports.is_Seller = (req, res, next) => {
 if(req.user.userType === "seller"){
    return next();
 }  
  req.flash("error", "please login as a seller");
  res.redirect("/seller/login");
}

module.exports.is_User = (req, res, next) => {
 if(req.user.userType === "User"){
    return next();
 }  
  req.flash("error", "please login as a User");
  res.redirect("/login");
}