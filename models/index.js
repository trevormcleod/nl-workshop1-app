var mongoose = require('mongoose'),
    UserSchema = require('./User');


// connect

var uri = 'mongodb://nodelingo:GAworkshop@linus.mongohq.com:10099/instadb';

mongoose.connect(uri);

// initialize User Model

var User = mongoose.model('User', UserSchema);

module.exports.User = User;
