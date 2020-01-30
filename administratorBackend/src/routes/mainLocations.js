const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middlewares').checkAuthentication;
const checkAuthenticationForGetEndpoints = require('../middlewares').checkAuthenticationForGetEndpoints;
const mainLocationsController = require('../controllers/mainLocations');

router.get('/',checkAuthenticationForGetEndpoints, mainLocationsController.getAllLocations);
router.post('/',checkAuthentication, mainLocationsController.createLocation);
router.put('/:locationId',checkAuthenticationForGetEndpoints, mainLocationsController.updateLocationById);
router.delete('/:locationId',checkAuthentication, mainLocationsController.deleteLocationById);

module.exports = router;
