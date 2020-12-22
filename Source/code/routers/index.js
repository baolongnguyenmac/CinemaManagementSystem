const express = require("express");

const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const LocalUser = require("../models/LocalUser");

const Film = require("../models/Film");

// Home Page
router.get("/", function(req, res){
  res.render('home', {
    isAuthenticated: req.isAuthenticated()
  });
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  //Dùng async-await
  try {
    const result = await LocalUser.find({});
    res.render("dashboard", {
      user: req.user,
      users: result
    });
  }
  catch(err) {
    console.log(err); 
  }
});

module.exports = router;
