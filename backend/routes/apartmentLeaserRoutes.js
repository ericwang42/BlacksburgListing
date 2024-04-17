const express = require('express')
const router = express.Router()
const apartmentLeaserController = require('../controllers/apartmentLeaserController')

router.post('/', apartmentLeaserController.createLeaser)
router.get('/', apartmentLeaserController.readLeaser)
router.get('/:id', apartmentLeaserController.readLeaserById)
router.put('/:id', apartmentLeaserController.updateLeaser)
router.delete('/:id', apartmentLeaserController.deleteLeaser)
router.post('/login', apartmentLeaserController.loginLeaser)
router.post('/register', apartmentLeaserController.registerLeaser)
router.post('/change-password', apartmentLeaserController.changePassword)


module.exports = router
