const express = require("express");

const router = express.Router();

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");

const LocalUser = require("../models/LocalUser");

const Film = require("../models/Film");

const OccupiedSeat = require("../models/OccupiedSeat");

const paypal = require("paypal-rest-sdk");

const Ticket = require('../models/Ticket');

const HistoryPayment = require('../models/HistoryPayment');

const Seat = require('../models/Seat');

const Room = require('../models/Room');
const Schedule = require("../models/Schedule");

// Home Page
router.get("/", async (req, res) => {
  const films = await Film.find();
  let releaseTimes = [];
  for (let i = 0; i < films.length; i++) {
    releaseTimes.push(films[i].releaseTime.toDateString());
  }

  res.render("home", {
    films: films,
    releaseTimes: releaseTimes,
    isAuthenticated: req.isAuthenticated(),
  });
});

//Thanh toán thành công
router.get("/paymentSuccess", async (req, res) => {
  let occupiedSeat = await OccupiedSeat.findOne({
    _id: req.session.occupiedSeatID,
  });
  let seats = req.session.seats;
  let amount = req.session.amount;
  //Cập nhật những ghế vừa mới được đặt
  for (let i = 0; i < seats.length; i++) {
    await occupiedSeat.idSeats.push(seats[i]);
  }
  await occupiedSeat.save();

  //Tạo các vé
  for (let i = 0; i < seats.length; i++) {
    Ticket.insertMany({
      idSchedule: occupiedSeat.idSchedule,
      idSeat: seats[i],
      price: res.locals.price,
      idUser: req.user._id
    });
  }

  //Cập nhật lịch sử mua vé - HistoryPayment
  let seatsName = [];
  for (let i = 0; i < seats.length; i++) {
    const seat = await Seat.findOne({
      _id: seats[i]
    });
    await seatsName.push(seat.name);
  }
  await HistoryPayment.insertMany({
    idSchedule: occupiedSeat.idSchedule,
    idUser: req.user._id,
    seats: seatsName.toString(),
    amount: amount
  });

  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [{
      amount: {
        currency: "USD",
        total: amount.toString(),
      },
    },],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      // console.log(JSON.stringify(payment));
      // console.log("PayerID: " + PayerID);
      req.session.occupiedSeatID = null;
      req.session.seats = null;
      req.session.amount = null;
      res.redirect('/myticket');
    }
  );
});

//Thanh toán thất bại
router.get("/paymentFail", (req, res) => {
  req.session.occupiedSeatID = null;
  req.session.seats = null;
  req.session.amount = null;
  res.render('failPayment');
});

//Vé của tôi
router.get('/myticket', async (req, res) => {
  const historyPayments = await HistoryPayment.find({ idUser: req.user._id });

  let myTickets = [];
  for (let i = 0; i < historyPayments.length; i++) {
    let myTicket = new Object();
    await Schedule.findOne({ _id: historyPayments[i].idSchedule }).then(async (sche) => {
      let minute = sche.time.getMinutes();
      let hour = sche.time.getHours().toString();
      if (minute < 10) {
        minute = '0' + minute.toString();
      }

      const room = await Room.findOne({ _id: sche.idRoom });
      const film = await Film.findOne({ _id: sche.idFilm });
      myTicket.room = room.name;
      myTicket.film = film.name;
      myTicket.poster = film.poster;
      myTicket.date = sche.time.getDate() + "/" + (sche.time.getMonth() + 1) + "/" + sche.time.getYear()
      myTicket.time = hour.toString() +":"+minute.toString()
    });
    myTicket.amount = historyPayments[i].amount;
    myTicket.seats = historyPayments[i].seats;
    myTickets.push(myTicket);
  }
  res.render('myticket', {
    isAuthenticated: req.isAuthenticated(),
    myTickets: myTickets
  });
});


module.exports = router;