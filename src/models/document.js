const mongoose = require('mongoose');
const mongoConnection = require('../config/mongoConfig');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    id_user: String,
    contenido: String,
    tipo: String,
  });
  
  userSchema.index({ contenido: 1, id_user: 1 }, { unique: true });
  
  const Docs = mongoConnection.model('document', userSchema);
  

module.exports = Docs;