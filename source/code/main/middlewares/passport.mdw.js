const passport = require("passport");

module.exports = function (app) {
  // Passport Config
  require("../config/passport")(passport);

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
