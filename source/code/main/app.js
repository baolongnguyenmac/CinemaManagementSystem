//Repair modul
const express = require("express");

const app = express();

//Body-parser
app.use(express.urlencoded());


require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/router.mdw')(app);
require('./middlewares/error.mdw')(app);

//Server
app.listen(8080, console.log("Server running on Port: 8080"));