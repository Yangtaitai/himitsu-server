var Comment = require('../models').Comment;

module.exports.getCommentList = function(req, res) {

    console.log("req.query" + req.query);

    console.log("req.comment " + req.comment);

    var queryParams = {};

    if (req.query.secret) {
        queryParams.secret = {
            "$regex": req.query.secret,
            "$options": "i"
        }
    }

    if (req.query.secret) {
        queryParams.secret = req.query.secret;
    }

    var query = Comment.find(queryParams);

    query.select("owner secret content");

    query.populate('owner', 'firstName lastName', 'User');

    query.populate('secret', 'content', 'Secret');

    query.exec(function(err, comment) {
        console.log("req.params" + req.params);

        res.json({
            result: !err,
            data: comment,
            err: err
        });
    })

}

module.exports.getComment = function(req, res) {

}

module.exports.createComment = function(req, res) {

    console.log(req.body);

    var comment = new Comment();

    comment.owner = req.body.owner;
    comment.secret = req.body.secret;
    comment.content = req.body.content;

    comment.save(function(err, commentData) {
        res.json({
            result: !err,
            data: commentData,
            err: err
        });
    });
}

module.exports.deleteComment = function(req, res) {

}