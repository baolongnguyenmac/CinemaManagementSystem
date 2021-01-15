//Repair modul
const express = require("express");

const app = express();

//Express-static
app.use('/public',express.static('public'));

//Body-parser
app.use(express.urlencoded());

//require('./middlewares/dbCloud.mdw')(app);
require('./middlewares/dbLocal.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/router.mdw')(app);
require('./middlewares/error.mdw')(app);
require('./middlewares/paypal.mdw')(app);


//Server
app.listen(8080, console.log("Server running on Port: 8080"));


// const express = require('express');

// const app = express();

// app.use(express.urlencoded());

// require('./middlewares/dbCloud.mdw')(app);
// const LocalUser = require('./models/LocalUser');
// const FaceBookUser = require('./models/LocalUser');
// const Ticket = require('./models/Ticket');
// const Schedule = require('./models/Schedule');
// const Seat = require('./models/Seat');
// const Room = require('./models/Room');
// const Film = require('./models/Film');
// const OccupiedSeat = require('./models/OccupiedSeat');

// Film.find({}).then((docs)=>{
//     console.log(docs);
// })