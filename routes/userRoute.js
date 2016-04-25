var User = require('../models').User;

module.exports.getUserList = function(req, res){
    
    console.log(req.query);
    
    res.json({result:true,data:[]});
}

module.exports.getUser = function(req, res){
    
    
    // console.log(req.params);
    
    res.json({result:true,data:{_id:req.params.id}});
}

module.exports.createUser = function(req, res) {
    
    //get request body
    console.log(req.body);
    
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    
    user.save(function(err, userData){
        res.json( {
            result: !err,
            data : userData,
            err: err
        });
    });
    
}
