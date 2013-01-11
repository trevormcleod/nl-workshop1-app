var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  accessToken: String,
  id: String,
  following: [FriendSchema],
  followers: [FriendSchema],
  bio: String,
  profileImage: String
});

var FriendSchema = Schema({
  name: String,
  id: String,
  profileImage: String
});

module.exports = UserSchema;