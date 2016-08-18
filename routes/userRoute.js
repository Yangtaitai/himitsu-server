
var passport = require('passport');
LocalStrategy = require('passport-local').strategy;

var md5 = require('MD5');
var User = require('../models').User;


module.exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
        result: false,
        err: 'ERR_NOT_ALLOWED'
    });
};

module.exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.json({
                result: false,
                err: info
            });
            //return res.redirect('/m_login_failure?callback='+req.body.callback);
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            console.log('successful login');
            console.log(req.user);

            var user = {};
            user.id = req.user._id;
            user.name = req.user.name;
            user.firstname = req.user.firstname;
            user.lastname = req.user.lastname;
            user.gender = req.user.gender;
            user.avatar = req.user.avatar;

            return res.json({
                // id: user.id,
                result: true,
                data: user
            });
            // return res.redirect('/users/ + user.name');

        });
    })(req, res, next);

    // User.findOne({'email':req.body.email},function (err,user) {
    //     if(!user) {
    //         res.json({
    //             result: false,
    //             err: 'The email is not exist'
    //         });
    //     }
    //     else{
    //         if(user.password == md5(req.body.password)){
    //             res.json({
    //                 result: true,
    //                 data: user
    //             });
    //         }
    //         else{
    //             res.json({
    //                 result: false,
    //                 err:'The password is not correct!'
    //             });
    //         }
    //     }
    // });

};

module.exports.getUserList = function(req, res) {

    // var firstName = req.query.firstName;


    console.log('user logged? ' + req.isAuthenticated());
    console.log(req.user);
    var queryParams = {};

    // contain match
    if (req.query.firstName) {
        queryParams.firstName = {
            "$regex": req.query.firstName,
            "$options": "i"
        }
    }

    if (req.query.lastName) {
        queryParams.lastName = {
            "$regex": req.query.lastName,
            "$options": "i"
        }
    }

    // exact match

    if (req.query.name) {
        queryParams.name = req.query.name;
    }

    if (req.query.email) {
        queryParams.email = req.query.email;
    }

    if (req.query.gender) {
        queryParams.gender = req.query.gender;
    }

    var query = User.find(queryParams);

    if (req.isAuthenticated()) {    //authenticate successful return following parameters
        query.select("name email gender firstName lastName avatar");
    } else {
        query.select("name gender firstName lastName");
    }



    query.exec(function(err, users) {

        console.log(req.params);

        res.json({
            result: !err,
            data: users,
            err: err,
            test:'heihei'
        });

        // res.json({result:true,data});
    });
}


module.exports.getUser = function(req, res) {

    console.log(req.user.id); // login user

    console.log(req.params); // user/:id information

    var select;

    if (req.user.id == req.params.id) {  // if it is user itself
        select = "name email gender birthday firstName lastName avatar publishedSecret following followers createdAt loggedAt";
    } else {                             // otherwise
        select = "name gender avatar publishedSecret following followers createdAt ";
    }

    User.findById(req.params.id, select, function(err, user) {

        res.json({
            result: !err,
            data: user,
            err: err,
        });

        // res.json({result:true,data});
    });


}

module.exports.createUser = function(req, res, next) {

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = md5(req.body.password);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;

    if (user.email == ('' && null) || user.password == ('' && null) || user.name == ('' && null)) {
        return res.json({
            result: false,
            err: 'ERR_PARAM_ERR'
        });
    }

    user.save(function(err, userData) {
        res.json({
            result: !err,
            data: userData,
            err: err
        });
    });

}


module.exports.updateUser = function(req, res) {
    var userId = req.params.id;

    if (userId) {
        if (userId != req.user.id) {
            res.json({
                result: false,
                err: 'ERR_NOT_ALLOWED'
            });
        } else {
            
            User.findById(req.user.id, function(err, user) {
                
                if (req.body.firstName)
                    user.firstName = req.body.firstName;
                if (req.body.lastName)
                    user.lastName = req.body.lastName;
                if (req.body.password)
                    user.password = md5(req.body.password);
                if (req.body.gender)
                    user.gender = req.body.gender;
                if (req.body.birthday)
                    user.birthday = req.body.birthday;


                user.save(function(err, saveUser) {
                    return res.json({
                        result: !err,
                        data: saveUser,
                        err: err
                    });
                });
            })
        }
    }
}


module.exports.deleteUser = function(req, res, next) {


}
