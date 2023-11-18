const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/local';

mongoose.connect(mongoURI);

const mongoConnection = mongoose.connection;

mongoConnection.on('connected', () => {
  console.log('Conectado a MongoDB');
});

mongoConnection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

module.exports = mongoConnection;
