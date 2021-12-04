const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema({
  userId: String,
  usersForecasts: String,
  name: String,
  registrationDate: {type: Date, default: Date.now()},
  rating: String,
  accessLevel: String
});


module.exports = model('User', User);
