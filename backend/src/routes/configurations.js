const express = require('express');
const router = express.Router();

const configurationsController = require('../controllers/mainlocations');

router.get('/', configurationsController.getAllConfigurations);
router.post('/', configurationsController.createConfiguration);
router.put('/:locationId', configurationsController.updateLocationById);
router.delete('/:locationId', configurationsController.deleteLocationById);


module.exports = router;
