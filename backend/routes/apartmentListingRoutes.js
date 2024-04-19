const express = require('express')
const router = express.Router()
const apartmentListingController = require('../controllers/apartmentListingController')

router.post('/', apartmentListingController.createApartmentListing)
router.get('/', apartmentListingController.readApartmentListing)
router.get('/:id', apartmentListingController.readApartmentListingById)
router.get('/:id/reviews', apartmentListingController.getReviewsForApartment)
router.put('/:id', apartmentListingController.updateApartmentListing)
router.delete('/:id', apartmentListingController.deleteApartmentListing)

module.exports = router
