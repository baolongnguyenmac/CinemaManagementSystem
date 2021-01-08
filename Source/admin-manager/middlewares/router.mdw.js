
const admin = require("../routers/admin");

module.exports = function (app) {
  app.use("/admin", admin);
};
