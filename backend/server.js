const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

const blacksburgResidentRoutes = require('./routes/blacksburgResidentRoutes')
const apartmentLeaserRoutes = require('./routes/apartmentLeaserRoutes')
const apartmentListingRoutes = require('./routes/apartmentListingRoutes')
const dormListingRoutes = require('./routes/dormListingRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use('/api/Blacksburg_Resident', blacksburgResidentRoutes)
app.use('/api/Apartment_Leaser', apartmentLeaserRoutes)
app.use('/api/Apartment_Listing', apartmentListingRoutes)
app.use('/api/Dorm_Listing', dormListingRoutes)
app.use('/api/Review', reviewRoutes)
app.use('/api/Admin', adminRoutes)

// checks for any unhandled requests
app.use('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
