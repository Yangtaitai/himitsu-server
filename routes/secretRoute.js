var Secret = require('../models').Secret;

module.exports.getSecretList = function (req, res) {
    console.log(req.query);
    res.json({result: true, data:[]});
}

module.exports.getSecret = function (req,res) {
    
}

module.exports.createSecret = function(req,res){
    console.log(req.body);
    
    var secret = new Secret();
    secret.owner = req.body.name;
    secret.content = req.body.content;
    
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