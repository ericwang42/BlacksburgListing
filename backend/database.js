const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rushi*Carolin3',
    database: 'BBL',
})

con.connect(function (err) {
    if (err) throw err
    console.log('Connected to the MySQL database.')
})

module.exports = con
