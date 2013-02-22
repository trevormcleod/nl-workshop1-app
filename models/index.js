var mongoose = require('mongoose'),
    UserSchema = require('./User'),
    conf = require('../conf');

// connect

var uri = conf.mongo_uri;

mongoose.connect(uri);

// initialize User Model

var User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.uri = uri;
