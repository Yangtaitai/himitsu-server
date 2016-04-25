
var passport = require('passport');
var md5 = require('MD5');
var User = require('../models').User;

module.exports.login = function(req,res,next){
    
}

module.exports.getUserList = function(req, res){
    
    console.log(req.query);
    
    res.json({result:true,data:[]});
}

module.exports.getUser = function(req, res){
    
    var name = req.param('name');
    if (name) {
        user.findByName(name,function (err,user) {
            if (err) {
                res.json(Results.ERR_DB_ERR);
            }else{
                var data = {
                    name: user.name,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    gender: user.gender,
                    avatar:user.avatar
                };
                console.log(req.user._id,user._id);
                console.log(req.user.name,user.name);
                console.log(user.toObject());
                
                var userObject = user.toObject();
            }
        })
    }
    // console.log(req.params);
    
    //res.json({result:true,data:{_id:req.params.id}});
    res.json({result:true,data});
}

module.exports.createUser = function(req, res, next) {
    
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    
    
    user.password = md5(user.password);
    
    user.save(function(err, userData){
        res.json( {
            result: !err,
            data : userData,
            err: err
        });
    });
    
}

module.exports.deleteUser = function (req,res,next) {
    var name = req.param('name');
    
    if (!name) {
        return res.json({result:false,err:'ERR_DB_ERR'});
    }
    
    User.findByName(name).remove(function (err) {
        if (err) {
            return res.json({result:false,err:'ERR_DB_ERR'});
        }
        return res.json({result:true});
    })
}

module.exports.updateUser = function (req,res) {
    
}


