const express = require('express');
const router = express.Router();

const mainlocationsController = require('../controllers/mainlocations');

router.get('/', mainlocationsController.getAllLocations);
router.post('/', mainlocationsController.createLocation);
router.put('/:locationId', mainlocationsController.updateLocationById);
router.delete('/:locationId', mainlocationsController.deleteLocationById);


module.exports = router;
