const express = require("express");

const router = express.Router();

const Manager = require("../models/Manager.js");

const Room = require("../models/Room.js");

const Movie = require("../models/Film.js");

const filmschedule = require("../models/Schedule.js");


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
    console.log(req.user);
    res.render("admin/common/home", {
      user: req.user,
    })
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


Movie.findById(req.query.id).then((user)=>{
    let data = [];
    let movie_info;

    if(user){
      movie_info = user;
    }

    movie_info.releaseTime =  new Date(movie_info.releaseTime).toISOString().replace(/T/, ' ').replace(/\..+/, '').substr(0, 19);
    console.log(movie_info.releaseTime);
 
    data["movie_info"] = movie_info;

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/movie/movieEdit",{
      user:req.user, data:data
    });
});
});
router.post("/movie/movieEdit",ensureAuthenticated,async function (req, res) {
const {
  id,
  name,
  gender,
  password,
  description,
  avatar, 
} = req.body; 

movie.findById(id).then(async (user)=>{
  if(user){
      if( password !==""){
        user.password = await bcrypt.hash(req.body.password, 10);
      }
      user.name = req.body.name;
      user.gender = req.body.gender;
      user.description = req.body.description;
      user.avatar = req.body.avatar;
      user.save();
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
  poster,
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
    poster,
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
   
  filmschedule.find({},async function(err, filmschedules) {
      let data = [];
      let filmschedules_arr = [];

  
      filmschedules.forEach(function(filmschedule) {
        console.log( filmschedule.time);
          filmschedule.time = new Date(filmschedule.time).toISOString().replace(/T/, ' ').replace(/\..+/, '').substr(0, 19);
         
          filmschedules_arr.push(filmschedule);
      });

      data['filmschedules'] = filmschedules_arr;
      data['movies'] = await Movie.find({});
      data['rooms'] = await Room.find({});
      console.log(data['movies']);

      res.render("admin/filmschedule/filmschedulesList", {
          user: req.user, data:data
      })
  });

  
});
router.get("/filmschedule/filmscheduleEdit",ensureAuthenticated, function (req, res) {


filmschedule.findById(req.query.id).then((user)=>{
    let data = [];
    let filmschedule_info;

    if(user){
      filmschedule_info = user;
    }

    data["filmschedule_info"] = filmschedule_info;

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/filmschedule/filmscheduleEdit",{
      user:req.user, data:data
    });
});
});
router.post("/filmschedule/filmscheduleEdit",ensureAuthenticated,async function (req, res) {
const {
  id,
  name,
  gender,
  password,
  description,
  avatar, 
} = req.body; 

filmschedule.findById(id).then(async (user)=>{
  if(user){
      if( password !==""){
        user.password = await bcrypt.hash(req.body.password, 10);
      }
      user.name = req.body.name;
      user.gender = req.body.gender;
      user.description = req.body.description;
      user.avatar = req.body.avatar;
      user.save();
  }
});
res.redirect("/admin/filmschedule/filmschedulesList");
});
router.get("/filmschedule/filmscheduleAdd",ensureAuthenticated, function (req, res) {

    let data = [];

    data["title"] = "Thông tin giảng viên";
    
    res.render("admin/filmschedule/filmscheduleAdd",{
      user:req.user, data:data
    });

});
router.post("/filmschedule/filmscheduleAdd",ensureAuthenticated,async function (req, res) {
const {
  email,
  name,
  gender,
  password,
  description,
} = req.body; 

  const newfilmschedule = new filmschedule({
    email ,
    password,
    name,
    gender,
    description,
  });

  newfilmschedule.password =  await bcrypt.hash(newfilmschedule.password, 10);
  newfilmschedule.save().then(()=>{
    console.log("user save");
  });
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
      res.json(avatar);
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