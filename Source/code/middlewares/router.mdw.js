const index = require("../routers/index");

const users = require("../routers/users");

module.exports = function (app) {
  //Router
  app.use("/", index);
  app.use("/users", users);
};
