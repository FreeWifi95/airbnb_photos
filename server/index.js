const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:id', express.static(path.join(__dirname, '/../public')));

app.get('/photos/:id', (req, res) => {
  const houseId = req.params.id;
  db.getHousePics(houseId, (error, data) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3003);
