const express = require('express');
const router = express.Router();

const refershTokenHandler = require('./handler/refresh-tokens')

router.post('/', refershTokenHandler.create)
router.get('/', refershTokenHandler.getToken)

module.exports = router;
