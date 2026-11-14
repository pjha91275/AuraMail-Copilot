const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAccounts);
router.post('/:id/sync', accountController.syncAccount);
router.post('/', accountController.addAccount);

module.exports = router;
