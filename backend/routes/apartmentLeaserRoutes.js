const express = require('express')
const router = express.Router()
const apartmentLeaserController = require('../controllers/apartmentLeaserController')

router.post('/', apartmentLeaserController.createLeaser)
router.put('/:id', apartmentLeaserController.updateLeaser)
router.delete('/:id', apartmentLeaserController.deleteLeaser)
router.get('/', apartmentLeaserController.readLeaser)

module.exports = router
