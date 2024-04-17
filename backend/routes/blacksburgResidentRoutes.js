const express = require('express')
const router = express.Router()
const blacksburgResidentController = require('../controllers/blacksburgResidentController')

router.post('/', blacksburgResidentController.createResident)
router.get('/', blacksburgResidentController.readResident)
router.get('/:id', blacksburgResidentController.readResidentById)
router.put('/:id', blacksburgResidentController.updateResident)
router.delete('/:id', blacksburgResidentController.deleteResident)
router.post('/login', blacksburgResidentController.loginResident)
router.post('/register', blacksburgResidentController.registerResident)
router.post('/change-password', blacksburgResidentController.changePassword)

module.exports = router
