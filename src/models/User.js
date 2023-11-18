const mongoose = require('mongoose');
const mongoConnection = require('../config/mongoConfig');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    tipe: String,
  });
  
  userSchema.index({ username: 1, email: 1 }, { unique: true });
  
  const User = mongoConnection.model('Users', userSchema);
  

module.exports = User;
