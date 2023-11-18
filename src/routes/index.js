const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const documentRoutes = require('./documentRoutes');
const userRoutes = require('./userRoutes')
console.log("comenzo dos")
router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/register', userRoutes)
router.use()

module.exports = router;