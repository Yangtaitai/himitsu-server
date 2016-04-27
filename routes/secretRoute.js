var Secret = require('../models').Secret;

module.exports.getSecretList = function (req, res) {
    
    console.log(req.query);
    // res.json({result: true, data:[]});
    console.log(req.secret);
    
    var queryParams = {};
    
    if(req.query.content){
        queryParams.content = {
            "$regex": req.query.content, 
            "$options": "i" 
        }
    }
    
    if (req.query.owner) {
        queryParams.owner = req.query.name;
    }
    
    var query = Secret.find(queryParams);
    
    query.where('isPublic','true'); // condition
    
    query.select("owner content isPublic");
    
    query.exec(function(err, secrets) {

        console.log(req.params);
        
        res.json({
            result: !err,
            data: secrets,
            err: err
        });
    })
}

module.exports.getSecret = function (req,res) {
    
    console.log(req.params);
    
    var select = "owner content createdAt";
    
    if (req.secret._id = req.params.id) {
        select = "owner content images isPublic isAnonymous likes forwards createdAt";
    }
    
    Secret.findById(req.params.id, select, function (err,secret) {
        res.json({
           result: !err,
           data: secret,
           err:err 
        });
    })
}

module.exports.createSecret = function(req,res){
    console.log(req.body);
    
    var secret = new Secret();
    secret.name = req.body.name;
    secret.content = req.body.content;
    secret.isPublic = req.body.isPublic;
    secret.isAnonymous = req.body.isAnonymous;
    
    secret.save(function(err,secretData){
       res.json({
          result: !err,
          data: secretData,
          err:err 
       }); 
    });
}

module.exports.updateSecret = function(req,res){
    
}

module.exports.deleteSecret = function (req,res) {
    
}