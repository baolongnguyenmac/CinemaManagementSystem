const express = require('express');

const router = express.Router();

const LocalUser = require('../models/LocalUser');

const Schedule = require('../models/Schedule');

const Film = require('../models/Film');

const bcrypt = require('bcryptjs');

const passport = require('passport');

const OccupiedSeat = require('../models/OccupiedSeat');

const Seat = require('../models/Seat');

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');
const { route } = require('.');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

//Profile page
router.get('/account', ensureAuthenticated, (req, res) => res.render('account', {
  user: req.user
}));

//users post
router.post('/register', function (req, res) {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors
    });
  } else {
    LocalUser.findOne({
      email: email
    }).then(async (user) => {
      if (user) {
        errors.push({
          msg: 'Account existed, Try another email'
        });
        res.render('register', {
          errors
        });
      } else {
        const newUser = new LocalUser({
          name,
          email,
          password
        });
        newUser.password = await bcrypt.hash(newUser.password, 10);
        //Sử dụng promise 
        newUser.save().then(user => {
          req.flash('success_msg', 'Your are now registered and can log in');
          res.redirect('/users/login');
          console.log(newUser);
        }).catch(err => console.log(err));
      }
    })
  }
});

//Đăng nhập và xác thực đăng nhập local-user
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}));


//Phim đang chiếu
router.get('/nowShowing', ensureAuthenticated, async(req, res)=>{
  const films = await Film.find();
  let releaseTimes = [];
  for (let i = 0; i < films.length; i++) {
    releaseTimes.push(films[i].releaseTime.toDateString());
  }

  res.render('nowShowing', {
    films: films,
    releaseTimes: releaseTimes
  });
});

//Phim đang chiếu => Lịch chiếu
router.post('/nowShowingToSchedule', async (req, res)=>{
  req.session.movieID = req.body.movieID;
  const film = await Film.findOne({_id: req.session.movieID});
  const schedules = await Schedule.find({idFilm: req.session.movieID}).sort({time: 1});
  const releaseTimes = [];
  for (let index = 0; index < schedules.length; index++) {
    const releaseTime = schedules[index].time.getHours() + ':' + schedules[index].time.getMinutes();
    releaseTimes.push(releaseTime);
  }

  res.render('schedule', {
    film: film,
    schedules: schedules,
    releaseTimes: releaseTimes
  });
});

//Phim đang chiếu => Chi tiết phim
router.post('/nowShowingToMovieDetail', async (req, res)=>{
  req.session.movieID = req.body.movieID;
  const film = await Film.findOne({_id: req.session.movieID});
  const releaseTime = film.releaseTime.toDateString();

  res.render('movieDetail', {
    film: film,
    releaseTime: releaseTime
  });
});

//Chi tiết phim => Lịch chiếu
router.post('/movieDetailToSchedule', async (req, res)=>{
  req.session.movieID = req.body.movieID;
  const film = await Film.findOne({_id: req.session.movieID});
  const schedules = await Schedule.find({idFilm: req.session.movieID}).sort({time: 1});
  const releaseTimes = [];
  for (let index = 0; index < schedules.length; index++) {
    const releaseTime = schedules[index].time.getHours() + ':' + schedules[index].time.getMinutes();
    releaseTimes.push(releaseTime);
  }

  res.render('schedule', {
    film: film,
    schedules: schedules,
    releaseTimes: releaseTimes
  });
});

//Đặt vé
router.post('/booking', async (req, res)=>{
  req.session.scheduleID = req.body.scheduleID;
  let occupiedSeatNames = [];

  const occupiedSeat = await OccupiedSeat.findOne({idSchedule: req.session.scheduleID});
  if (occupiedSeat) {
    for (let i = 0; i < occupiedSeat.idSeats.length; i++) {
      const seat = await Seat.findOne({_id: occupiedSeat.idSeats[i]});
      occupiedSeatNames.push(seat.name);
    }
  }
  
  //await console.log(occupiedSeatNames);
  await res.render('booking', {
    layout: false,
    occupiedSeatNames: occupiedSeatNames,
    price: 1
  });
});

//Xác thục bởi facebook
router.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_photos']
}));

//Redirect từ facebook => web browser
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/'
}), function (req, res, next) {
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;