const express = require('express');
const router = express.Router();
const secretController = require('../controllers/secretController');

// Route pour récupérer les secrets
router.get('/', secretController.getEncryptedSensitiveData);

// Route pour obtenir un token JWT
router.get('/get-token', secretController.getJwtToken);
module.exports = router;
