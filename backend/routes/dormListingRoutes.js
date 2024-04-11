const express = require('express');
const router = express.Router();
const dormListingController = require('../controllers/dormListingController');

router.post('/', dormListingController.createDormListing);
router.put('/:id', dormListingController.updateDormListing);
router.delete('/:id', dormListingController.deleteDormListing);
router.get('/', dormListingController.readDormListing);

module.exports = router;
