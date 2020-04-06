var express = require('express');
var router = express.Router();

var bigchain = require('../../task/bgchain');

/* POST save insurans data in mongodb database */
router.post('/bigchain/', function(req, res) {
    var payload = req.body;

    var txn = bigchain.saveToBigchain(payload);
    res.status(200).send({transaction:txn})
});

module.exports = router;