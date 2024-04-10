var express = require('express');
var router = express.Router();
var apartmentListingController = require('../controllers/apartmentListingController');

router.get('/', apartmentListingController.listAll);
router.post('/', apartmentListingController.create);
router.put('/:id', apartmentListingController.update);
router.delete('/:id', apartmentListingController.delete);

module.exports = router;
