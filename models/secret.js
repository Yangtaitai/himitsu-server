var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var SecretSchema = new Schema({
    username: {
        type: ObjectId,
        required: true
    },
    content:String,
    images:[String],
    referUsers:[ObjectId],
    isAnonymous: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    likes: [ObjectId],
    forwards: [ObjectId],
    createdAt:{
        type: Date,
        default: Date.now
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    comments:[ObjectId]
});

mongoose.model('Secret',SecretSchema);