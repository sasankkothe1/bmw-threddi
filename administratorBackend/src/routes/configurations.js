const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middlewares').checkAuthentication;
const checkAuthenticationForGetEndpoints = require('../middlewares').checkAuthenticationForGetEndpoints;
const configurationsController = require('../controllers/configurations');


router.get('/', checkAuthenticationForGetEndpoints, configurationsController.getAllConfigurations);
router.post('/', checkAuthenticationForGetEndpoints, configurationsController.createConfiguration);
router.get('/:configurationId', checkAuthenticationForGetEndpoints, configurationsController.getConfigurationById);
router.put('/:configurationId', checkAuthentication, configurationsController.updateConfigurationById);
router.delete('/:configurationId', checkAuthentication, configurationsController.deleteConfigurationById);


module.exports = router;
