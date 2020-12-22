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


// const express = require('express');

// const app = express();

// require('./middlewares/dbLocal')(app);

// const LocalUser = require('./models/LocalUser');
// const FaceBookUser = require('./models/LocalUser');
// const Payment = require('./models/Payment');
// const Ticket = require('./models/Ticket');
// const Schedule = require('./models/Schedule');
// const Seat = require('./models/Seat');
// const Room = require('./models/Room');
// const Film = require('./models/Film');


// Film.find().then((films)=>{
//     for (let i = 0; i < films.length; i++) {
//         console.log(films[i]);
//         films[i].save().then(console.log('saved'));
//     }
// });

// LocalUser.find().then((docs)=>{
//     for (let i = 0; i < docs.length; i++) {
//         docs[i].avatar = '/public/avatar/default/avatar.png';
//         console.log(docs[i]);
//         docs[i].save().then(console.log('saved'));
//     }
// });

// FaceBookUser.find().then((docs)=>{
//     for (let i = 0; i < docs.length; i++) {
//         docs[i].avatar = '/public/avatar/default/avatar.png';
//         console.log(docs[i]);
//         docs[i].save().then(console.log('saved'));
//     }
// });