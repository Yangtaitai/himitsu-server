var mongoose = require('mongoose');

var config = require('../config');

mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }else{
        console.log('MongoDB connected!!!!!!');
    }
});

require('./user.js');
require('./comment.js');
require('./secret.js');


exports.User = mongoose.model('User');
exports.Comment = mongoose.model('Comment');
exports.Secret = mongoose.model('Secret');
