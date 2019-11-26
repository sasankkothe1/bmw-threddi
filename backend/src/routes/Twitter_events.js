const express = require('express');
const router = express.Router();

const Twitter_eventsController = require('../controllers/Twitter_events');

router.get('/', Twitter_eventsController.generalTwitterObject);
// router.put('/:tweet_id', Twitter_eventsController.updateLocationById);
router.delete('/:tweet_id', Twitter_eventsController.deleteEventById);

module.exports = router;
