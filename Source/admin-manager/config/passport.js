const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Manager = require('../models/Manager');

module.exports = function (passport) {
    passport.use("admin",
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            Manager.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                })
            })
        })
    );

    //Call when auth complete to save user data to session
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    //Call by passport.session to get user data from session
    passport.deserializeUser(function (id, done) {
        Manager.findById(id).then(user=>{
            if (user) {
                done(null, user);
            }
        });
    });
};