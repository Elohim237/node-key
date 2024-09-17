const crypto = require('crypto');
const fs = require('fs');

// Lire la clé privée depuis un fichier
const privateKey = fs.readFileSync('privateKey.pem', 'utf8');

// Fonction pour déchiffrer les données avec la clé privée
function decryptData(encryptedData) {
  try {
    // Convertir les données chiffrées de base64 en Buffer
    const buffer = Buffer.from(encryptedData, 'base64');

    // Déchiffrer les données en utilisant la clé privée
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase: '',  // Ajoutez une passphrase si la clé privée est protégée
      },
      buffer
    );

    // Retourner les données déchiffrées (convertir en chaîne de caractères)
    return decryptedData.toString();
  } catch (error) {
    console.error('Erreur lors du déchiffrement des données :', error);
    return null;
  }
}

// Exemple d'utilisation de la fonction de déchiffrement
const encryptedData = 'I6zTA/U2aaQ1KFcdmaSn+eSR8yddefKwkz/fO6f6ohS20XvynElgrvYc/iV7F1OTC23nmC/t4nWGIjD6pRUKMG71OBEf821VJ08cWTr97BvS319g324+E/zN/YEz9who9b5sHegh13yv/VVd4tAVGgYy/pxDCccZBKyD+lvbAZ05hy6L520eQPmRDrdXQI8lG/61bWwde8nRiCq3O1Rmcbrt9Kb9yJDlrZif8KC439TedbYJGNQ/6TaqLJK5tgs3Sek5xeaDVXAhtEAXsygeMZDYSCtf4a6hEhOgac0SMCalAvUwmL7pv1cGq+r16Jl0vATNi9RquMfNfUbwC710/w==';  // Remplacez par les données chiffrées que vous avez

const decryptedData = decryptData(encryptedData);

console.log('Données déchiffrées:', decryptedData);
