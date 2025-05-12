// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(() => {
//       req.flash("error", "some error");
//       res.redirect("/")
//     });
//   };
// };

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
