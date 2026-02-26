const express = require('express');
const router = express.Router();
const businessLocationsController = require('../controllers/businessLocationsController');

router.get('/', businessLocationsController.getAllBusinessLocations);
router.get('/:id', businessLocationsController.getBusinessLocationById);
router.post('/', businessLocationsController.createBusinessLocation);
router.put('/:id', businessLocationsController.updateBusinessLocation);
router.delete('/:id', businessLocationsController.deleteBusinessLocation);

module.exports = router;
