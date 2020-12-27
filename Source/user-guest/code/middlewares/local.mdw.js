const flash = require("connect-flash");

module.exports = function (app) {
  // Connect flash
  app.use(flash());

  //Global variable. req.flash phải sử dụng express-session
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.price = 1;
    res.locals.scheduleDate = [new Date('2021-11-1'), new Date('2021-11-2'), new Date('2021-11-3')
    , new Date('2021-11-4'), new Date('2021-11-5'), new Date('2021-11-6'), new Date('2021-11-7') ];
    res.locals.scheduleDay = ['1/11/2021', '2/11/2021', '3/11/2021', '4/11/2021', '5/11/2021', '6/11/2021', '7/11/2021'];
    next();
  });
};
