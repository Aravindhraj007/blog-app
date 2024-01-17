const mysql = require('mysql2')
const env = require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

db.connect((err, data) => console.log("Database connected"))

module.exports = db