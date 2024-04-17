const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.createReview)
router.get('/', reviewController.readReview)
router.get('/:id', reviewController.readReviewById)
router.put('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)

module.exports = router
