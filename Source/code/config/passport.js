const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({
                email: email
            }).then(user=> {
                if (!user) {
                    return done(null, false, {message: 'That email is not registered'});
                }
                bcrypt.compare(password, user.password).then((isMatch)=>{
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                })
            })
            // User.findOne({
            //     email: email
            // }).then(user => {
            //     if (!user) {
            //         return done(null, false, { message: 'That email is not registered' });
            //     }
            //     // Match password
            //     bcrypt.compare(password, user.password, (err, isMatch) => {
            //         if (err) throw err;
            //         if (isMatch) {
            //             return done(null, user);
            //         } else {
            //             return done(null, false, { message: 'Password incorrect' });
            //         }
            //     });
            // });
        })
    );
    //use by passport.authenticate
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //use by req.logout
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};