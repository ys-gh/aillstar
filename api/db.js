const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'db_container',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("connecting MySQL...");
});

module.exports = db;
