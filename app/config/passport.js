/**
 * @author Sávio Muniz
 */

const passport = require('passport');
const LocalStratagy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

mongoose.Promise = require('bluebird');

passport.use(new LocalStratagy({
    usernameField: 'registration'
}, function (registration, password, done) {
    User.findOne({registration: registration}).then(function (user) {
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }
        if (!user.isValidPassword(password)) {
            return done(null, false, {message: 'Not authorized'});
        }
        return done(null, user);
    })
})
.catch(function (err) {
    return done(err);
}));
