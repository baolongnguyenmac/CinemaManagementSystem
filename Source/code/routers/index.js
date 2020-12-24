const express = require("express");

const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const LocalUser = require("../models/LocalUser");

const Film = require("../models/Film");

const OccupiedSeat = require("../models/OccupiedSeat");

const paypal = require("paypal-rest-sdk");

//Thanh toán thành công
router.get("/paymentSuccess", async (req, res) => {
  let occupiedSeat = await OccupiedSeat.findOne({
    _id: req.session.occupiedSeatID,
  });
  let seats = req.session.seats;
  let amount = req.session.amount;
  for (let i = 0; i < seats.length; i++) {
    await occupiedSeat.idSeats.push(seats[i]);
  }
  await occupiedSeat.save();

  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount.toString(),
        },
      },
    ],
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
      res.render('successPayment');
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

// Home Page
router.get("/", function (req, res) {
  res.render("home", {
    isAuthenticated: req.isAuthenticated(),
  });
});
module.exports = router;
