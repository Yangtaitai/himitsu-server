var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('MD5');
var User = require('../models').User;




module.exports = function(app) {
    
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function (user, done) {
        //res.locals.current_user
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            badRequestMessage: 'ERR_MISSING_CREDENTIALS'
        },
        function (email, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // Find the user by username.  If there is no user with the given
                // username, or the password is not correct, set the user to `false` to
                // indicate failure and set a flash message.  Otherwise, return the
                // authenticated `user`.
                User.findOne({email: email}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, 'ERR_INVALID_USER');
                    }
                    if (user.password != md5(password)) {
                        return done(null, false, 'ERR_INVALID_PASSWORD');
                    }

                    user.loggedAt = new Date();
                    user.save();

                    return done(null, user);
                });
            });
        }
    ));



    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
        
};