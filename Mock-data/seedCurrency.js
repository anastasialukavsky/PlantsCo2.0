// const { db } = require('../index');
// const db = require('../server/DB/database');
// const { Currency } = require('../server/DB/');

const currencyList = [
  { currencyName: 'USD', rate: 1 },
  { currencyName: 'GBP', rate: 0.8323 },
  { currencyName: 'EUR', rate: 0.9382 },
  { currencyName: 'CAD', rate: 1.3606 },
];

// async function seedCurrency() {
//   // await db.sync({ force: true });

//   await Currency.bulkCreate(currencyList, { validate: true });

//   console.log('Currency list populated');

//   // await db.close();
// }

// seedCurrency();

module.exports = currencyList;
