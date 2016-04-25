var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    name : {
        type: String,
        index: {unique:true}
    },
    email : {
        type: String,
        index: {unique:true}
    },
    password : String,
    avatar : String,
    gender : {
        type: String,
        default: 'female'
    },
    birthday : Date,
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    loggedAt: {
        type: Date,
        default: Date.now
    },
    publishedSecret: {
        type: Number,
        default: 0
    },
    followings: [ObjectId],
    followers:  [ObjectId]
});

mongoose.model('User', UserSchema);