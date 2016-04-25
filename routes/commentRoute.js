var Comment = require('../models').Comment;

module.exports.getCommentList = function (req,res) {
    console.log(req.query);
    res.json({ersult:true,data:[]});
}

module.exports.getComment = function (req,res) {
    
}

module.exports.createComment = function (req,res) {
    
}

module.exports.deleteComment = function (req,res) {
    
}
