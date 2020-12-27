const expressLayouts = require("express-ejs-layouts");

module.exports = function (app) {
  //EJS
  app.use(expressLayouts);
  app.set("view engine", "ejs");
};
