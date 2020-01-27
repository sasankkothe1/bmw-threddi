const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middlewares').checkAuthentication;
const mainLocationsController = require('../controllers/mainLocations');

router.get('/', mainLocationsController.getAllLocations);
router.post('/', mainLocationsController.createLocation);
// router.post('/',checkAuthentication, mainLocationsController.createLocation);
router.put('/:locationId',checkAuthentication, mainLocationsController.updateLocationById);
router.delete('/:locationId',checkAuthentication, mainLocationsController.deleteLocationById);

module.exports = router;
