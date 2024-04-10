var express = require('express');
var app = express();

app.use(express.json());

// use mysl driver
var mysql = require('mysql');

var con = mysql.createConnection({
    'host':"localhost",
    'user':"root",
    'password':"Rushi*Carolin3",
    'database':"BBL"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to the MySQL database.");

    // con.query("SELECT * FROM Blacksburg_Resident", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });
});

var port = 3001; 
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
