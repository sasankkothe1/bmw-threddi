const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middlewares').checkAuthentication;
const configurationsController = require('../controllers/configurations');


router.get('/', checkAuthentication, configurationsController.getAllConfigurations);
router.post('/', checkAuthentication, configurationsController.createConfiguration);
router.get('/:configurationId', checkAuthentication, configurationsController.getConfigurationById);
router.put('/:configurationId', checkAuthentication, configurationsController.updateConfigurationById);
router.delete('/:configurationId', checkAuthentication, configurationsController.deleteConfigurationById);


module.exports = router;
