var Comment = require('../models').Comment;

module.exports.getCommentList = function (req,res) {
    console.log(req.query);
    res.json({ersult:true,data:[]});
}

module.exports.getComment = function (req,res) {
    
}

module.exports.createComment = function (req,res) {
    
    console.log(req.body);
    
    var comment = new Comment();
    
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
