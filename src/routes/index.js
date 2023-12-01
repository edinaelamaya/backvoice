const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const documentRoutes = require('./documentRoutes');
const userRoutes = require('./userRoutes')
const traerdocumentos = require('./traerDocRoutes')
console.log("comenzo dos")
router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/register', userRoutes)
router.use('/traerdoc', traerdocumentos)

module.exports = router;