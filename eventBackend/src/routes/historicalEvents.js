const express = require('express');
const router = express.Router();

const eventController = require('../controllers/historicalEvent');

router.get('/', eventController.getAllHistoricalEvents);
router.get('/:historicalEventId', eventController.getHistoricalEventById);


module.exports = router;
