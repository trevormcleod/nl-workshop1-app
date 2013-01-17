var mongoose = require('mongoose'),
    UserSchema = require('./User');

// connect

var uri = 'localhost';

mongoose.connect(uri, 'instadb');

// initialize User Model

var User = mongoose.model('User', UserSchema);

module.exports.User = User;