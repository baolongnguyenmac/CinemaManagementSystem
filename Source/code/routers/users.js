const express = require('express');

const router = express.Router();

const LocalUser = require('../models/LocalUser');

const bcrypt = require('bcryptjs');

const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Profile page
router.get('/account', ensureAuthenticated, (req, res) => res.render('account', { user: req.user }));

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
    LocalUser.findOne({ email: email }).then(async (user) => {
      if (user) {
        errors.push({ msg: 'Account existed, Try another email' });
        res.render('register', {
          errors
        });
      }
      else {
        const newUser = new LocalUser({
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

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}));

// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/users/login',
// }),(req,res,next)=>{
//   res.redirect('/');
// });

router.get('/auth/facebook',
  passport.authenticate('facebook', {scope: ['email', 'user_photos']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/' 
}), function (req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;