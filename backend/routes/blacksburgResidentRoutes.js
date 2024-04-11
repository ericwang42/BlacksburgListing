const express = require('express');
const router = express.Router();
const blacksburgResidentController = require('../controllers/blacksburgResidentController');

router.post('/', blacksburgResidentController.createResident);
router.put('/:id', blacksburgResidentController.updateResident);
router.delete('/:id', blacksburgResidentController.deleteResident);
router.get('/', blacksburgResidentController.readResident);

module.exports = router;
