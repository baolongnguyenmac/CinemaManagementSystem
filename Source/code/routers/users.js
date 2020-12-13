const express = require('express');

const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Profile page
router.get('/account', ensureAuthenticated, (req, res) => res.render('account', {user: req.user}));

//users post
router.post('/register', function (req, res) {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors
    });
  } else {
    User.findOne({ email: email }).then(async (user) => {
      if (user) {
        errors.push({ msg: 'Account existed, Try another email' });
        res.render('register', {
          errors
        });
      }
      else {
        const newUser = new User({
          name,
          email,
          password
        });
        newUser.password = await bcrypt.hash(newUser.password, 10);
        //Sử dụng promise 
        newUser.save().then(user => {
          req.flash('success_msg', 'Your are now registered and can log in');
          res.redirect('login');
          console.log(newUser);
        }).catch(err => console.log(err));
      }
    })
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;