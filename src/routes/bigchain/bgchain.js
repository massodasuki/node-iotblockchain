var express = require('express');
var router = express.Router();

var bigchain = require('../../task/bgchain');

/* POST save insurans data in mongodb database */
router.post('/bigchain/', function(req, res) {
    var payload = req.body;

    // var txn = bigchain.saveToBigchain(payload);

    bigchain.saveToBigchain(payload).then(function (status){
        console.log(status);
        if (status == 200){
            res.status(200).send({transaction:txn})
        }
        else {
            res.status(400)
        }
        
    }).catch(function (err){
        res.status(400)
    })
    
});

module.exports = router;