const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting connection:", err);
  } else {
    console.log("Connected to database!");
    connection.release();
  }
});
module.exports = { pool };
