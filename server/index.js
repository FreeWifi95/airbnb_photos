const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/:id', (req, res) => {
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
