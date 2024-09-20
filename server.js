const https = require('https');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { port } = require('./src/config/config');  // Assurez-vous que 'port' est défini dans la config
const secretRoutes = require('./src/routes/secretRoutes');

// Charger les certificats SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ordercontrol.firstbackoffice.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ordercontrol.firstbackoffice.com/fullchain.pem', 'utf8');

// Créer une paire de clés pour HTTPS
const credentials = { key: privateKey, cert: certificate };

// Initialiser Express
const app = express();

// Sécuriser les en-têtes HTTP
app.use(helmet());

// Logger les requêtes HTTP
app.use(morgan('tiny'));

// Activer CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Utiliser le middleware pour traiter les JSON
app.use(express.json());

// Charger les routes pour les secrets
app.use('/api/secret', secretRoutes);

// Lancer le serveur HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Serveur démarré en HTTPS sur https://localhost:${port}`);
});
