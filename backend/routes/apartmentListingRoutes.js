const express = require('express');
const router = express.Router();
const apartmentListingController = require('../controllers/apartmentListingController');

router.post('/', apartmentListingController.createApartmentListing);
router.put('/:id', apartmentListingController.updateApartmentListing);
router.delete('/:id', apartmentListingController.deleteApartmentListing);
router.get('/', apartmentListingController.readApartmentListing);

module.exports = router;
