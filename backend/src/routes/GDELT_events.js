const express = require('express');
const router = express.Router();

const GDELT_eventsController = require('../controllers/GDELT_events');

router.get('/', GDELT_eventsController.generalGDELTObject);
// router.put('/:GlobalEventID', GDELT_eventsController.updateLocationById);
router.delete('/:GlobalEventID', GDELT_eventsController.deleteEventById);

module.exports = router;
