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

router.get('/createTransaction/', function(req, res) {
    return new Promise(function(resolve, reject){

        const driver = require('bigchaindb-driver');

        // BigchainDB server instance (e.g. https://example.com/api/v1/)
        const API_PATH = 'http://localhost:9984/api/v1/'

        // Create a new keypair.
        const alice = new driver.Ed25519Keypair()

        // Construct a transaction payload
        const tx = driver.Transaction.makeCreateTransaction(
            // Define the asset to store, in this example it is the current temperature
            // (in Celsius) for the city of Berlin.
            { city: 'Berlin, DE', temperature: 22, datetime: new Date().toString() },

            // Metadata contains information about the transaction itself
            // (can be `null` if not needed)
            { what: 'My first BigchainDB transaction' },

            // A transaction needs an output
            [ driver.Transaction.makeOutput(
                    driver.Transaction.makeEd25519Condition(alice.publicKey))
            ],
            alice.publicKey
        )

        // Sign the transaction with private keys
        const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

        // Send the transaction off to BigchainDB
        const conn = new driver.Connection(API_PATH)

        conn.postTransactionCommit(txSigned)
            .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
            })
});

module.exports = router;