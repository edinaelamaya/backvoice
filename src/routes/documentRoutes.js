// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const multer = require('multer');
const config = require('../config');

const upload = multer({ dest: config.uploadsDir });

router.post('/upload', upload.single('file'), documentController.uploadDocument);

module.exports = router;
