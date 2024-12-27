const express = require('express');
const { getTrafficLogs } = require('../controllers/trafficController');

const router = express.Router();

router.get('/logs', getTrafficLogs);

module.exports = router;