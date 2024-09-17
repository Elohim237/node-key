const dotenv = require('dotenv');

dotenv.config();

// S'assurer que toutes les variables d'environnement essentielles sont présentes
if (!process.env.ACCESS_KEY || !process.env.SECRET_KEY) {
  throw new Error('Missing critical environment variables. Please check your .env file.');
}

module.exports = {
  accessKey: process.env.ACCESS_KEY,
  apiSecret: process.env.SECRET_KEY,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  jwtSecret: process.env.JWT_SECRET || 'secret', // Clé secrète pour JWT
  port: process.env.PORT || 3001,
};
