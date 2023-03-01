// Import models here
const db = require('./server/DB/database');

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('syncing the database');
    db.close();
  } catch (e) {
    console.log(e);
    db.close();
  }
};

seed();
