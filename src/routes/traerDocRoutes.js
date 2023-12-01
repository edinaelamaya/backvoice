const express = require('express');
const router = express.Router();
const traerController = require('../controllers/traerController');

router.post('/list', traerController.traer);

module.exports = router;