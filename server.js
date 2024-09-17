const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { port } = require('./src/config/config');
const helmet = require('helmet');
const secretRoutes = require('./src/routes/secretRoutes');

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

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
