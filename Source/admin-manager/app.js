//Repair modul
const express = require("express");

const app = express();

//Express-static
app.use('/public', express.static('public'));
app.use( express.static('public'));
//Body-parser
app.use(express.urlencoded());

require('./middlewares/dbLocal')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/router.mdw')(app);
require('./middlewares/error.mdw')(app);
require('./middlewares/cloudinary.mdw')(app);

//Server
app.listen(3000, console.log("Server running on Port: 3000"));

const cloudinary = require('cloudinary').v2;




// cloudinary.uploader.upload('./avatar.png', {
//     public_id: ''
// }, (err, result)=>{
//     console.log(err);
//     console.log(result);
// });