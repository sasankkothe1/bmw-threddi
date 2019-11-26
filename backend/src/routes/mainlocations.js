const express = require('express');
const router = express.Router();

const mainlocationsController = require('../controllers/mainlocations');

router.get('/', mainlocationsController.generalLocationObjecr);
router.put('/:location_id', mainlocationsController.updateLocationById);
router.delete('/:location_id', mainlocationsController.deleteLocationById);


module.exports = router;
