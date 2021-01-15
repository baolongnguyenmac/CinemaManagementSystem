const express = require("express");

const router = express.Router();

const Manager = require("../models/Manager.js");

const Room = require("../models/Room.js");

const Movie = require("../models/Film.js");

const filmschedule = require("../models/Schedule.js");

const cloudinary = require("cloudinary").v2;

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const passport = require("passport");

const multer = require('multer');

const fs = require('fs');

const path = require('path');

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require("../config/auth");


// Home Page
router.get("/", ensureAuthenticated,  (req, res) => {
   res.redirect("/admin/homepage");
});

router.get("/homepage", ensureAuthenticated,  (req, res) => {
  console.log("homepage");
  res.render("admin/common/dashboard", {
    user: req.user,
  })
});

router.get("/login",forwardAuthenticated, function (req, res) {
    const data = [];
    res.render("admin/common/login",{
      data
    });
  });

router.post(
"/login",
passport.authenticate("admin", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/homepage",
})
);

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/admin/login");
});

router.get("/", (req, res) => {
  res.redirect("/admin/login");
});

router.get("/is-user-available", ensureAuthenticated, function (req, res) {
    Admin.findOne({email:req.query.email}).then((user)=>{
        if(user){
            res.json(false);
            return;
        }else{
          Manager.findOne({email:req.query.email}).then((user)=>{
            if(user){
              res.json(false);
            }else{
              res.json(true);
            }
          });
        }
    });
   
});

//for account


router.get("/account/edit", ensureAuthenticated,  (req, res) => {
  let data = [];
  data["title"] = "Thông tin tài khoản";
  res.render("admin/account/edit", {
    user: req.user,data :data
  })
});
router.post("/account/edit", ensureAuthenticated,  (req, res) => {
  Manager.findOne({email:req.user.email}).then( async (user)=>{
      if(user){
          if( req.body.password !==""){
            user.password =await bcrypt.hash(req.body.password, 10);
          }
          console.log(req.body.avatar);
          user.name = req.body.name;
          user.gender = req.body.gender;
          user.phone = req.body.phone;
          user.avatar = req.body.avatar;
          user.save();
      }
  });
  
  res.redirect("/admin/account/edit");
});
router.get("/", ensureAuthenticated,  (req, res) => {
  console.log(req.user);
  res.render("admin/common/home", {
    user: req.user,
  })
});


//route for manager
router.get("/manager/managersList", ensureAuthenticated,  (req, res) => {
   
  Manager.find({}, function(err, Managers) {
      let data = [];
      let Managers_arr = [];

  
      Managers.forEach(function(Manager) {

          Managers_arr.push(Manager);

      });

      data['Managers'] = Managers_arr;

      data["title"] = "Danh sách giảng viên";

      res.render("admin/manager/managersList", {
          user: req.user, data:data
      })
  });

  
});
router.get("/manager/managerEdit",ensureAuthenticated, function (req, res) {


Manager.findById(req.query.id).then((user)=>{
    let data = [];
    let Manager_info;

    if(user){
      Manager_info = user;
    }

    data["Manager_info"] = Manager_info;

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/Manager/ManagerEdit",{
      user:req.user, data:data
    });
});
});
router.post("/manager/managerEdit",ensureAuthenticated,async function (req, res) {
  const {
    id,
    name,
    gender,
    password,
    phone,
    avatar, 
  } = req.body; 

  Manager.findById(id).then(async (user)=>{
    if(user){
        if( password !==""){
          user.password = await bcrypt.hash(password, 10);
        }
        user.name = name;
        user.phone =phone;
        user.gender = gender;
        user.avatar = avatar;
        user.save();
    }
  });
  res.redirect("/admin/manager/managersList");
});
router.get("/manager/managerAdd",ensureAuthenticated, function (req, res) {

    let data = [];

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/manager/managerAdd",{
      user:req.user, data:data
    });

});
router.post("/manager/managerAdd",ensureAuthenticated,async function (req, res) {
const {
  email,
  name,
  gender,
  password,
  description,
} = req.body; 
  const newManager = new Manager({
    email ,
    password,
    name,
    gender,
    description,
  });

  newManager.password =  await bcrypt.hash(newManager.password, 10);
  newManager.save().then(()=>{
    console.log("user save");
  });
res.redirect("/admin/manager/managersList");
});
router.get("/manager/managerDelete",ensureAuthenticated,async function (req, res) {
  Manager.findByIdAndDelete(req.query.id).then( async (user)=>{
    if(user){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});
//route for movie

router.get("/movie/moviesList", ensureAuthenticated,  (req, res) => {
   
  Movie.find({}, function(err, movies) {
      let data = [];
      let movies_arr = [];

  
      movies.forEach(function(movie) {

          movies_arr.push(movie);

      });

      data['movies'] = movies_arr;

      data["title"] = "Danh sách giảng viên";

      res.render("admin/movie/moviesList", {
          user: req.user, data:data
      })
  });

  
});
router.get("/movie/movieEdit",ensureAuthenticated, function (req, res) {


Movie.findById(req.query.id).then((movie)=>{
    let data = [];
    let movie_info;

    if(movie){

    movie_info ={
      poster: movie.poster,
      description: movie.description,
      director: movie.director,
      cast: movie.cast,
      genre: movie.genre,
      runningTime: movie.runningTime,
      releaseTime:new Date( movie.releaseTime).toISOString().substr(0,16),
      trailer: movie.trailer,
      _id: movie._id,
      
      name:movie.name,
    }
    data["movie_info"] = movie_info;
    
    
    res.render("admin/movie/movieEdit",{
      user:req.user, data:data
    });
    }
    
});
});
router.post("/movie/movieEdit",ensureAuthenticated,async function (req, res) {
const {
  id,
  name,
  poster,
  genre,
  description,
  runningTime, 
  releaseTime,
  cast,
  director,
  trailer
} = req.body; 

Movie.findById(id).then(async (movie)=>{
  if(movie){
     
      movie.name = name;
      movie.poster = poster;
      movie.genre = genre;
      movie.description = description;
      movie.runningTime = runningTime;
      movie.releaseTime = releaseTime;
      movie.director = director;
      movie.trailer = trailer;
      movie.cast = cast;


      movie.save();
  }
});
res.redirect("/admin/movie/moviesList");
});
router.get("/movie/movieAdd",ensureAuthenticated, function (req, res) {

    let data = [];

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/movie/movieAdd",{
      user:req.user, data:data
    });

});
router.post("/movie/movieAdd",ensureAuthenticated,async function (req, res) {
const {
  name,
  description,
  genre,
  runningTime,
  releaseTime,
  cast,
  director,
  trailer,
} = req.body; 
  const newmovie = new Movie({
    name,
    description,
    genre,
    runningTime,
    releaseTime,
    cast,
    director,
    trailer,
  });

  newmovie.save().then(()=>{
    console.log("movie save");
  });
res.redirect("/admin/movie/moviesList");
});
router.get("/movie/movieDelete",ensureAuthenticated,async function (req, res) {
Movie.findByIdAndDelete(req.query.id).then( async (user)=>{
  if(user){
    res.json(true);
  }else{
    res.json(false);
  }
});
});

//route for schedules

router.get("/filmschedule/filmschedulesList", ensureAuthenticated, async (req, res) => {
  let data = [];
  var Schedule_arr = await filmschedule.find({}).populate('idRoom').populate('idFilm');
  data['filmschedules'] = Schedule_arr;
  console.log(  data['filmschedules'] );
  res.render("admin/filmschedule/filmschedulesList", {
    user: req.user,
     data:data
  });
});

router.get("/filmschedule/filmscheduleEdit",ensureAuthenticated, async function (req, res) {


filmschedule.findById(req.query.id).then(async(schedule)=>{
    let data = [];
    let filmschedule_info;

    if(schedule){
      filmschedule_info = schedule;

      data["movies"] = await Movie.find({});
      data["rooms"]  = await Room.find({});

      data["filmschedule_info"] = {
        _id :filmschedule_info._id,
        time:new Date( filmschedule_info.time).toISOString().substr(0,16),
        idFilm :filmschedule_info.idFilm,
        idRoom :filmschedule_info.idRoom,
      };

    


      data["title"] = "Thông tin giảng viên";
      
      res.render("admin/filmschedule/filmscheduleEdit",{
        user:req.user, data:data
      });
    }
});
});
router.post("/filmschedule/filmscheduleEdit",ensureAuthenticated,async function (req, res) {
  const {
    id,
    movie,
    room,
    time,
  } = req.body; 

filmschedule.findById(id).then( (schedule)=>{
  if(schedule){
     
    schedule.movie = movie;
    schedule.room = room;
    schedule.time = time;
    
    schedule.save();
  }
});
res.redirect("/admin/filmschedule/filmschedulesList");
});
router.get("/filmschedule/filmscheduleAdd",ensureAuthenticated,async function (req, res) {

    let data = [];

    data["movies"] = await Movie.find({});
    data["rooms"]  = await Room.find({});
    data["title"] = "Thêm lịch chiếu phim";
    
    res.render("admin/filmschedule/filmscheduleAdd",{
      user:req.user, data:data
    });

});
router.post("/filmschedule/filmscheduleAdd",ensureAuthenticated,async function (req, res) {



  const movie_info = await Movie.findById( req.body.movie);
  const room_info = await Room.findById(req.body.room);

  const newfilmschedule = new filmschedule({
    time:req.body.time ,
    idFilm :movie_info._id,
    idRoom: room_info._id,
    name: "Phim " + movie_info.name + " " + room_info.name,
  });


  newfilmschedule.save();
res.redirect("/admin/filmschedule/filmschedulesList");
});
router.get("/filmschedule/filmscheduleDelete",ensureAuthenticated,async function (req, res) {
  filmschedule.findByIdAndDelete(req.query.id).then( async (user)=>{
    if(user){
      res.json(true);
    }else{
      res.json(false);
    }
  });
});



router.get("/theater",ensureAuthenticated,async function (req, res) {
  let data = [];

  data['theaters'] =  [{ name : "CGV Hoàng Văn Thụ", position : 'Quận Tân Bình, HCM', number_of_cine : '4' },
                       { name : "CGV LANDMARK", position : 'Quận Bình Thạnh, HCM', number_of_cine : '5' },
                       { name : "CGV Vincom", position : 'Quận Thủ Đức, HCM', number_of_cine : '5' },
                       { name : "CGV ", position : 'Quận Tân Bình, HCM', number_of_cine : '4' },
                       { name : "CGV Hùng Vương Plaza", position : 'Quận 2, HCM', number_of_cine : '3' },
                       { name : "CGV Giga Mall Thủ Đức", position : 'Quận Thủ Đức, HCM', number_of_cine : '7' },
                       { name : "CGV Sư Vạn Hạnh", position : 'Quận 9, HCM', number_of_cine : '2' }];
  res.render("admin/theater/theatersList",{
    user:req.user, data:data
  });
});

router.post('/upload', function (req, res) {
  
  folder_name = req.query.folder;
  // fs.mkdir(path.join(__dirname, '../public/avatar/'+req.query.id.toString()), () => {});
  fs.mkdir(path.join(__dirname, '../public' + folder_name + req.query.id.toString()), () => {});

  const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      // cb(null, './public/avatar/' + req.query.id);
      cb(null, './public' + folder_name + req.query.id);
      
      // cb(null, './public/avatar');

    },
    filename: function (req, file, cb) {
      let avatar = ('/public') + folder_name + req.query.id.toString() + '/' + 'avatar.png';
      // Manager.findOne({
      //   _id: req.user._id
      // }).then((user) => {
      //   user.avatar = avatar;
      //   user.save();
      // });
      cb(null, 'avatar.png');
    }
  });
  const upload = multer({
    storage
  });
  upload.single('file')(req, res, function async (err) {

    if (err) {
      console.log(err);
    } else {
      const avatar =  ('/public') + folder_name  + req.query.id.toString() + '/' + 'avatar.png';
      const file_path = path.dirname(require.main.filename) + avatar;
     console.log(file_path);

      cloudinary.uploader.upload(file_path, {
          public_id: req.query.folder_cloud + '/' +req.query.id.toString() + '/avatar.png',
      }, (err, result)=>{
          console.log(err);
          // console.log(result);
          res.json(result.url);
      });
    }
  });
});


router.get("/is-manager-available", ensureAuthenticated, function (req, res) {
  Manager.findOne({email:req.query.email}).then((user)=>{
      if(user){
          res.json(false);
      }else{
          res.json(true);
      }
  });
});
module.exports = router;