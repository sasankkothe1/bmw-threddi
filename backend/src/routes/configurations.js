const express = require('express');
const router = express.Router();

const configurationsController = require('../controllers/configurations');

router.get('/', configurationsController.getAllConfigurations);
router.post('/', configurationsController.createConfiguration);
router.get('/:configurationId', configurationsController.getConfigurationById);
router.put('/:configurationId', configurationsController.updateConfigurationById);
router.delete('/:configurationId', configurationsController.deleteConfigurationById);


module.exports = router;
