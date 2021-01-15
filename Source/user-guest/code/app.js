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
require('./middlewares/paypal.mdw')(app);


//Server
app.listen(8080, console.log("Server running on Port: 8080"));


// const express = require('express');

// const app = express();

// app.use(express.urlencoded());

// require('./middlewares/dbLocal')(app);
// const LocalUser = require('./models/LocalUser');
// const FaceBookUser = require('./models/LocalUser');
// const Ticket = require('./models/Ticket');
// const Schedule = require('./models/Schedule');
// const Seat = require('./models/Seat');
// const Room = require('./models/Room');
// const Film = require('./models/Film');
// const OccupiedSeat = require('./models/OccupiedSeat');

// Film.insertMany({
//     name: 'Kimetsu no Yaiba: Muggen Train',
//     poster: '/public/poster/demon_slayer_mugen_train/poster.jpeg',
//     description: 'Thanh Gươm Diệt Quỷ: Chuyến Tàu Vô Tận là một bộ anime điện ảnh chiếu rạp năm 2020 của Nhật Bản, dựa trên manga Thanh gươm diệt quỷ của Koyoharu Gotōge. Đây là phiên bản nối tiếp điện ảnh của loạt anime 2019, do Haruo Sotozaki đạo diễn và được sản xuất bởi Ufotable.',
//     director: 'Haruo Sotozaki',
//     cast: 'Kitō Akari, Hanae Natsuki',
//     genre: 'Friction',
//     runningTime: '120 phút',
//     releaseTime: '2020-12-11',
//     trailer: 'https://www.youtube.com/embed/PrZ0O8Qp18s'
// }).then(console.log('saved'));

// Schedule.insertMany({
//     name: 'Phim Kimetsu no Yaiba phòng 0',
//     time: '2021-11-02T13:30:00.000+00:00',
//     idFilm: '5feda3de104dc7332caa5ced',
//     idRoom: '5fdf63c2d92ac21fb4ef73ae'
// }).then(console.log('saved'));



// Film.find({}).then((docs)=>{
//     console.log(docs);
// });
// Schedule.find({}).then((docs)=>{
//     console.log(docs);
// });