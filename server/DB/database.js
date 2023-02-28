const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/plants-and-co`,
  {
    logging: false,
  }
);

module.exports = db;
