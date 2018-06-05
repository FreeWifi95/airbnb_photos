const express = require('express');
const app = express();
const db = require('../database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/houses/', (req, res) => {
  const url_id = req.param('id');
  db.getHousePics(url_id, (error, data) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3003, () => console.log('listening on port 3003'));
