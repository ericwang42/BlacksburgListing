const express = require('express')
const router = express.Router()
const blacksburgResidentController = require('../controllers/blacksburgResidentController')

router.post('/', blacksburgResidentController.createResident)
router.get('/', blacksburgResidentController.readResident)
router.get('/:id', blacksburgResidentController.readResidentById)
router.put('/:id', blacksburgResidentController.updateResident)
router.delete('/:id', blacksburgResidentController.deleteResident)

module.exports = router
