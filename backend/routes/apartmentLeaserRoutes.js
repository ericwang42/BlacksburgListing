const express = require('express')
const router = express.Router()
const apartmentLeaserController = require('../controllers/apartmentLeaserController')

router.post('/register', apartmentLeaserController.registerLeaser)
router.get('/', apartmentLeaserController.readLeaser)
router.get('/:id', apartmentLeaserController.readLeaserById)
router.put('/:id', apartmentLeaserController.updateLeaser)
router.delete('/:id', apartmentLeaserController.deleteLeaser)
router.post('/change-password', apartmentLeaserController.changeLeaserPassword)

module.exports = router
