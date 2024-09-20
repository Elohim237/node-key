const express = require('express');
const router = express.Router();
const secretController = require('../controllers/secretController');

// Route pour récupérer les secrets
router.get('/', secretController.getEncryptedSensitiveData);

module.exports = router;
