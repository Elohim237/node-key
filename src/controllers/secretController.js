const { accessKey, apiSecret,username,password } = require('../config/config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Charger la clé publique (assurez-vous que le chemin est correct)
const publicKey = fs.readFileSync('publicKey.pem', 'utf8');

// Fonction pour chiffrer les informations sensibles avec la clé publique
function encryptSensitiveData(accessKey, secretKey, username, password) {
  const sensitiveData = JSON.stringify({ accessKey, secretKey, username, password });
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(sensitiveData));
  return encryptedData.toString('base64');
}

// Contrôleur pour obtenir les données chiffrées
exports.getEncryptedSensitiveData = (req, res) => {
  try {
    const encryptedData = encryptSensitiveData(
      accessKey,
      apiSecret,
      username,
      password
    );
    res.json({ encryptedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to encrypt data', error });
  }
};

// Contrôleur pour générer un JWT (optionnel)
exports.getJwtToken = (req, res) => {
  try {
    const token = jwt.sign(
      { accessKey: accessKey, apiSecret: apiSecret, username: username, password: password },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate token', error });
  }
};

exports.getSecret = (req, res) => {

  res.json({
    message: 'Voici les clés API',
    accessKey: accessKey,  
    apiSecret: apiSecret,
    username:username,
    password:password
  });
};