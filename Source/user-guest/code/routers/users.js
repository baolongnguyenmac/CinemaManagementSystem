const express = require("express");

const router = express.Router();

const LocalUser = require("../models/LocalUser");

const Schedule = require("../models/Schedule");

const Film = require("../models/Film");

const bcrypt = require("bcryptjs");

const passport = require("passport");

const OccupiedSeat = require("../models/OccupiedSeat");

const Seat = require("../models/Seat");

const mongoose = require('mongoose');

const multer = require('multer');

const fs = require('fs');

const path = require('path');

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");
const route = require(".");
const paypal = require("paypal-rest-sdk");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

//Profile page
router.get("/account", ensureAuthenticated, (req, res) =>
  res.render("account", {
    user: req.user,
  })
);

//users post
router.post("/register", function (req, res) {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please enter all fields",
    });
  }

  if (password != password2) {
    errors.push({
      msg: "Passwords do not match",
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
    });
  } else {
    LocalUser.findOne({
      email: email,
    }).then(async (user) => {
      if (user) {
        errors.push({
          msg: "Account existed, Try another email",
        });
        res.render("register", {
          errors,
        });
      } else {
        const newUser = new LocalUser({
          name,
          email,
          password,
        });
        newUser.password = await bcrypt.hash(newUser.password, 10);
        //Sử dụng promise
        newUser
          .save()
          .then((user) => {
            req.flash("success_msg", "Your are now registered and can log in");
            res.redirect("/users/login");
            console.log(newUser);
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

//Đăng nhập và xác thực đăng nhập local-user
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/",
  })
);

//Xác thục bởi facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "user_photos"],
  })
);

//Redirect từ facebook => web browser
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  function (req, res, next) {
    res.redirect("/");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

//Get Update information
router.get('/updateInfor', ensureAuthenticated, (req, res) => {
  res.render('updateinfor', {
    name: req.user.name
  });
});

//Post Update information
router.post("/updateInfor", ensureAuthenticated, async (req, res) => {

  const name = req.body.name;
  const newPassword = req.body.newPassword;
  const confPassword = req.body.confPassword;
  const gender = req.body.gender;

  let errors = [];
  if (!name || !newPassword || !confPassword || !gender) {
    errors.push({
      msg: "Please enter all fields",
    });
  }

  if (newPassword != confPassword) {
    errors.push({
      msg: "Passwords do not match",
    });
  }

  if (newPassword.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters",
    });
  }

  if (errors.length > 0) {
    res.render("updateinfor", {
      errors,
    });
  } else {
    await LocalUser.findOne({
      _id: req.user._id,
    }).then(async (user) => {
      user.name = name;
      user.password = await bcrypt.hash(newPassword, 10);
      user.gender = gender;
      user.save().then(() => {
        req.flash("success_msg", "Your are updated");
        res.redirect('/users/account');
      });
    });
  }
});

//Get update Avatar
router.get('/updateAvatar', (req, res) => {
  res.render('updateAvatar');
});

//Upload avatar
router.post('/upload', function (req, res) {

  console.log('dir$:' + __dirname);
  fs.mkdir(path.join(__dirname, '../public/avatar/'+req.user._id.toString()), () => {});

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/avatar/' + req.user._id);
    },
    filename: function (req, file, cb) {
      let avatar = ('/public/avatar/') + req.user._id.toString() + '/' + 'avatar.png';
      LocalUser.findOne({
        _id: req.user._id
      }).then((user) => {
        user.avatar = avatar;
        user.save();
      });
      cb(null, 'avatar.png');
    }
  });
  const upload = multer({
    storage
  });
  upload.single('fuMain')(req, res, function async (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/users/account');
    }
  });
});

//Phim đang chiếu
router.get("/nowShowing", async (req, res) => {
  const films = await Film.find();
  let releaseTimes = [];
  for (let i = 0; i < films.length; i++) {
    releaseTimes.push(films[i].releaseTime.toDateString());
  }

  res.render("nowShowing", {
    films: films,
    releaseTimes: releaseTimes
  });
});

//Lịch chiếu
router.post("/getSchedule", async (req, res) => {
  const movieID = req.body.movieID;
  const film = await Film.findOne({
    _id: movieID,
  });

  let date = res.locals.scheduleDate[0];
  let dateIndex = 0;
  if (req.body.dateIndex) {
    dateIndex = req.body.dateIndex;
    date = res.locals.scheduleDate[+req.body.dateIndex];
  }

  let schedules = [];

  await Schedule.find({
    idFilm: movieID
  }).sort({
    time: 1
  }).then(async (docs) => {

    for (let i = 0; i < docs.length; i++) {
      if (docs[i].time.getDate() == date.getDate() &&
        docs[i].time.getMonth() == date.getMonth() &&
        docs[i].time.getFullYear() == date.getFullYear()) {
        await schedules.push(docs[i]);
      }
    }
  });

  const releaseTimes = [];
  for (let index = 0; index < schedules.length; index++) {
    let minutes;
    if ((minutes = schedules[index].time.getMinutes()) < 10) {
      minutes = '0' + minutes.toString();
    }
    const releaseTime = schedules[index].time.getHours() + ":" + minutes;
    releaseTimes.push(releaseTime);
  }

  await res.render("schedule", {
    film: film,
    schedules: schedules,
    releaseTimes: releaseTimes,
    scheduleDay: res.locals.scheduleDay,
    dateIndex: dateIndex
  });
});

//Phim đang chiếu => Chi tiết phim
router.post("/nowShowingToMovieDetail", async (req, res) => {
  const movieID = req.body.movieID;
  const film = await Film.findOne({
    _id: movieID,
  });
  const releaseTime = film.releaseTime.toDateString();

  res.render("movieDetail", {
    film: film,
    releaseTime: releaseTime,
  });
});

//Đặt vé
router.post("/Schedule", ensureAuthenticated, async (req, res) => {
  const scheduleID = req.body.scheduleID;
  let occupiedSeatNames = [];

  // console.log(scheduleID);

  let occupiedSeat = await OccupiedSeat.findOne({
    idSchedule: scheduleID
  });
  if (occupiedSeat == null) {
    await OccupiedSeat.insertMany({
      idSchedule: scheduleID,
      idSeats: []
    });
  } else {
    for (let i = 0; i < occupiedSeat.idSeats.length; i++) {
      const seat = await Seat.findOne({
        _id: occupiedSeat.idSeats[i],
      });
      occupiedSeatNames.push(seat.name);
    }
  }

  // await console.log(occupiedSeatNames);
  // await console.log(occupiedSeat);

  await res.render("booking", {
    occupiedSeatNames: occupiedSeatNames,
    scheduleID: scheduleID,
    price: res.locals.price
  });
});

//Chọn phương thức thanh toán
router.post("/checkout", (req, res) => {
  let {
    checkedSeats,
    scheduleID,
    amount
  } = req.body;

  res.render("payment", {
    checkedSeats: checkedSeats,
    amount: amount,
    scheduleID,
  });
});

//Thanh toán
router.post("/payment", async (req, res) => {
  let {
    checkedSeats,
    scheduleID,
    amount,
    paymentMethod
  } = req.body;

  //Cập nhật danh sách ghế đã đặt chỗ
  let checkedSeatList = [];
  while (true) {
    let i = checkedSeats.indexOf(",");
    if (i == -1) {
      let seat = checkedSeats;
      checkedSeatList.push(seat);
      break;
    }
    let seat = checkedSeats.slice(0, i);
    checkedSeatList.push(seat);
    checkedSeats = checkedSeats.slice(i + 1);
  }
  let schedule = await Schedule.findOne({
    _id: scheduleID,
  });
  let seats = [];
  for (let i = 0; i < checkedSeatList.length; i++) {
    let seat = await Seat.findOne({
      idRoom: schedule.idRoom,
      name: checkedSeatList[i],
    });
    seats.push(seat._id);
  }



  let occupiedSeat = await OccupiedSeat.findOne({
    idSchedule: scheduleID
  });
  // await console.log(occupiedSeat);
  //Chuyển thông tin ghế đã chọn cho thanh toán thành công
  req.session.occupiedSeatID = occupiedSeat._id;
  req.session.seats = seats;
  req.session.amount = amount;


  //Tạo thanh toán
  if (paymentMethod == "paypal") {
    console.log("paypal handler");

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8080/paymentSuccess",
        cancel_url: "http://localhost:8080/paymentFail",
      },
      transactions: [{
        item_list: {
          items: [{
            name: "Cinema ticket",
            sku: "001",
            price: res.locals.price,
            currency: "USD",
            quantity: checkedSeatList.length.toString(),
          }, ],
        },
        amount: {
          currency: "USD",
          total: amount.toString(),
        },
        description: "",
      }, ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          //console.log(payment);
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  }
});



module.exports = router;