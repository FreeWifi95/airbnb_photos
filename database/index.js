const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);

const getHousePics = (param, callback) => {
  const q = 'SELECT * FROM photo WHERE house_id = ' + param;
  connection.query(q, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getHousePics
};
