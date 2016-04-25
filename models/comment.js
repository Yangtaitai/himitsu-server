var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    secret:ObjectId,
    content:String,
    replyTo:ObjectId,
    isAnonymous	:{
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    referUsers: [ObjectId]
});

mongoose.model('Comment', commentSchema);