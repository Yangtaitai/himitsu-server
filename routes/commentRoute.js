var Comment = require('../models').Comment;

module.exports.getCommentList = function (req,res) {
    console.log(req.query);
    res.json({ersult:true,data:[]});
}
