const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: "sql.freedb.tech",
  port: 3306,
  user: "freedb_database-user",
  password: "6G9D7c73czC#3ym",
  database: "freedb_databasegenuppgift3ps",
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

// DB_USERNAME=freedb_database-user
// DB_PASSWORD=6G9D7c73czC#3ym
// DB_DATABASE=freedb_databasegenuppgift3ps
// DB_HOST=sql.freedb.tech
// DB_PORT=3306
