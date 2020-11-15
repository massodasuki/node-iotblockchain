var express = require('express');
var router = express.Router();

var bigchain = require('../../task/bgchain');

/* POST save insurans data in mongodb database */
router.post('/bigchain/', function(req, res) {
    return new Promise(function(resolve, reject){

    var payload = req.body;

    // var txn = bigchain.saveToBigchain(payload);

    bigchain.saveToBigchain(payload).then(function (status){
        console.log('routes/bigchain/bgchain.js', status);
        if (status.ok == 200){
            
            resolve({ok:200, data_id:status.data_id})
            // res.status(200).send({transaction:txn})
        }
        else {
            res.status(400)
        }
        
    }).catch(function (err){
        res.status(400)
    })
    })
});

router.post('/direct/', function(req, res) {
    return new Promise(function(resolve, reject){

        var payload = req.body;
        // var txn = bigchain.saveToBigchain(payload);
        bigchain.saveToBigchain(payload).then(function (status){
            console.log('routes/bigchain/bgchain.js', status);
            if (status.ok == 200){
                console.log("bigchainDirect = ", status);
                
                return res.redirect('/direct');
            }
            else {

                console.log("bigchainDirect = ", 400);
                return res.redirect('/direct');
            }
            
        }).catch(function (err){
            res.status(400)
        })
    })
});

router.get('/test/', function(req, res, next) {

    res.render('test');

});


module.exports = router;