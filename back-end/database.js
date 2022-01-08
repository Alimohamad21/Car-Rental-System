const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "car_rental_db"
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("database connected..");
})

module.exports = db;
