const express = require('express')
const router = express.Router()
const blacksburgResidentController = require('../controllers/blacksburgResidentController')

router.post('/register', blacksburgResidentController.registerResident)
router.get('/', blacksburgResidentController.readResident)
router.get('/:id', blacksburgResidentController.readResidentById)
router.put('/:id', blacksburgResidentController.updateResident)
router.delete('/:id', blacksburgResidentController.deleteResident)
router.post('/:id/change-password', blacksburgResidentController.changeResidentPassword)

module.exports = router
