const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const config = require('config');

console.log('Using database url ', config.database_url);

const db = new Sequelize(
  // loads the correct database url based on NODE_ENV (default / dev / test)
  config.database_url || `postgres://localhost:5432/plants-and-co`,
  {
    logging: false,
  }
);

module.exports = db;
