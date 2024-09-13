// parcel-plugin-dotenv.js
const dotenv = require('dotenv');

dotenv.config(); // Load variables from .env into process.env

module.exports = function(bundler) {
  bundler.on('buildEnd', () => {
    console.log('Env Variables Loaded:', process.env);
  });
};
