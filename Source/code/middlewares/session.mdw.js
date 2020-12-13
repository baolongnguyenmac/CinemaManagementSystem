const session = require("express-session");
const mongoose = require("mongoose");

module.exports = function (app) {
  //DB config
  const db = require("../config/key").MongoURI;
  const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 50,
  };
  mongoose
    .connect(db, mongooseConfig)
    .then(console.log("Database connected"))
    .catch((err) => console.log(err));

  // Express session
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
};
