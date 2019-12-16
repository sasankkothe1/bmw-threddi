const express = require('express');
const router = express.Router();

const mainLocationsController = require('../controllers/mainLocations');

router.get('/', mainLocationsController.getAllLocations);
router.post('/', mainLocationsController.createLocation);
router.put('/:locationId', mainLocationsController.updateLocationById);
router.delete('/:locationId', mainLocationsController.deleteLocationById);


module.exports = router;
