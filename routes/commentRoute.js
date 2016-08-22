var Comment = require('../models').Comment;

module.exports.getCommentList = function (req,res) {
    console.log(req.query);
    
    var queryParams = {};
    
    if (req.query.content) {
        queryParams.content = {
            "$regex": req.query.firstName,
            "$options": "i"
        }
    }
    
    var query = Comment.find(queryParams);
    
    query.select("secret content");
    
    query.exec(function(err, comment) {
        console.log(req.params);

        res.json({
            result: !err,
            data: comment,
            err: err
        });
    })
   
}

module.exports.getComment = function (req,res) {
    
}

module.exports.createComment = function (req,res) {
    
    console.log(req.body);
    
    var comment = new Comment();
    
    comment.owner = req.body.owner;
    comment.secret = req.body.secret;
    comment.content = req.body.content;
    
    comment.save(function (err,commentData) {
        res.json({
            result:!err,
            data: commentData,
            err:err
        });
    });
}

module.exports.deleteComment = function (req,res) {
    
}
