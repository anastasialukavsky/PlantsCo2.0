const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT_NUMBER || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use('*', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();
