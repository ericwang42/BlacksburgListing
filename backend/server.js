const express = require('express');
const cors = require("cors")
const app = express()
const port = 3000

app.use(express.json());
app.use(cors())

const blacksburgResidentRoutes = require('./routes/blacksburgResidentRoutes');
const apartmentLeaserRoutes = require('./routes/apartmentLeaserRoutes');
const apartmentListingRoutes = require('./routes/apartmentListingRoutes');
const dormListingRoutes = require('./routes/dormListingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/blacksburg_resident', blacksburgResidentRoutes);
app.use('/api/apartment_leaser', apartmentLeaserRoutes);
app.use('/api/apartment_listing', apartmentListingRoutes);
app.use('/api/dorm_listing', dormListingRoutes);
app.use('/api/review', reviewRoutes);

// checks for any unhandled requests
app.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
