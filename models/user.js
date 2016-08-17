var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    firstName : {
        type: String,
        default:'secret'
    },
    lastName : {
        type: String,
        default:'baobao'
    },
    username : {
        type: String,
        required: true,
        index: {unique:true}
    },
    email : {
        type: String,
        required: true,
        index: {unique:true}
    },
    password : {
        type: String,
        required: true
    },
    
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