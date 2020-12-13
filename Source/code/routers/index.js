const express = require("express");

const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const User = require("../models/User");

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
    const result = await User.find({});
    res.render("dashboard", {
      user: req.user,
      users: result
    });
  }
  catch(err) {
    console.log(err); 
  }
  

  //Dùng promise
  // User.find({}).then(function(data) {
  //   res.render("dashboard", {
  //     user: req.user,
  //     users: data,
  //   });
  // }).catch(err=>{
  //   console.log(err);
  // });  

  //Dùng callback
  // User.find({},function(err, data) {
  //   res.render("dashboard", {
  //     user: req.user,
  //     users: data,
  //   });
  // }).catch(err=>{
  //   console.log(err);
  // }); 
});

module.exports = router;
