const errorHandler = require("express-async-errors");

module.exports = function (app) {
  //404 error handler
  app.use(function (req, res) {
    res.render("404", {
      layout: false,
    });
  });
  
  //500 error handler
  app.use(function (err, req, res, next) {
    console.log(err);
    res.render("500", {
      layout: false,
    });
  });
};
