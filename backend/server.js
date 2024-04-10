var express = require('express');
var app = express();
var apartmentListingRoutes = require('./routes/apartmentListingRoutes');

app.use(express.json());

require('./database');

app.use('/api/apartmentlistings', apartmentListingRoutes);



var apartmentListingRoutes = require('./routes/apartmentListingRoutes');
app.use('/api/apartmentlistings', apartmentListingRoutes);


var port = 3001; 
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});