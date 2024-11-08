// db/index.js

const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: config.db.connectionLimit,
});

module.exports = pool.promise();
