const express = require('express');
const { clearBlacklist, addWhitelist, removeWhitelist } = require('../controllers/adminController');

const router = express.Router();

router.get('/clear-blacklist', clearBlacklist);
router.post('/add-whitelist', addWhitelist);
router.post('/remove-whitelist', removeWhitelist);

module.exports = router;