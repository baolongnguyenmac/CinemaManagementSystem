//Repair modul
const express = require("express");

const app = express();

//Express-static
app.use('/public',express.static('public'));


//Body-parser
app.use(express.urlencoded());

require('./middlewares/dbLocal')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/router.mdw')(app);
require('./middlewares/error.mdw')(app);

//Server
app.listen(8080, console.log("Server running on Port: 8080"));

// const LocalUser = require('./models/LocalUser');
// const FaceBookUser = require('./models/LocalUser');
// const Payment = require('./models/Payment');
// const Ticket = require('./models/Ticket');
// const Schedule = require('./models/Schedule');
// const Seat = require('./models/Seat');