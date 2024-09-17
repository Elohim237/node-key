const crypto = require('crypto');
const fs = require('fs');

// Générer une paire de clés RSA
crypto.generateKeyPair('rsa', {
  modulusLength: 2048,  // Taille de la clé
  publicKeyEncoding: {
    type: 'pkcs1',      // "Public Key Cryptography Standards 1"
    format: 'pem'       // Encodage au format PEM
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
}, (err, publicKey, privateKey) => {
  if (err) {
    console.log('Erreur lors de la génération des clés :', err);
    return;
  }

  // Sauvegarder les clés dans des fichiers
  fs.writeFileSync('publicKey.pem', publicKey);
  fs.writeFileSync('privateKey.pem', privateKey);

  console.log('Les clés ont été générées et sauvegardées dans publicKey.pem et privateKey.pem');
});
