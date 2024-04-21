const express = require('express')
const router = express.Router()
const dormListingController = require('../controllers/dormListingController')

router.post('/', dormListingController.createDormListing)
router.get('/', dormListingController.readDormListing)
router.get('/:id', dormListingController.readDormListingById)
router.get('/:id/reviews', dormListingController.getReviewsForDorm)
router.put('/:id', dormListingController.updateDormListing)
router.delete('/:id', dormListingController.deleteDormListing)

module.exports = router
