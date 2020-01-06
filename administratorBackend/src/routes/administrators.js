const express = require('express');
const router = express.Router();
const administratorController = require('../controllers/adminstrators');

router.post('/login', administratorController.login);
router.post('/register', administratorController.register);


module.exports = router;