require('dotenv').config();  

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root', 
    password: 'Ashish@2003', 
    database: process.env.DB_NAME || 'erp' 
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); 
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = db;
