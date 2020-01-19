const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event');

router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/location', eventController.getEventLocation);
router.delete('/:eventId', eventController.deleteEventById);


module.exports = router;
