
//https://www.npmjs.com/package/bigchaindb-driver
// BigchainDB server instance (e.g. https://example.com/api/v1/)
const driver = require('bigchaindb-driver')
// BigchainDB server instance (e.g. https://example.com/api/v1/)

const urlExists = require('url-exists');
var config = require('../config/config');
const API_PATH =  'http://'+ config.blockchain_ip + config.blockchain_port +'/api/v1/' 

function saveToBigchain (payload){
    return new Promise(function(resolve, reject){
        
        try 
        {
            // Create a new keypair.
            const alice = new driver.Ed25519Keypair()

            // Construct a transaction payload
            const tx = driver.Transaction.makeCreateTransaction(
                // Define the asset to store
                { age: payload.age,
                    sex: payload.sex,
                    bmi: payload.bmi,
                    children: payload.children,
                    smoker: payload.smoker,
                    region: payload.region,
                    charge: payload.charge
                },
                // Metadata contains information about the transaction itself
                { meta: 'insurance' },
            
                // A transaction needs an output
                [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(alice.publicKey))
                ],
                alice.publicKey
            )
            
            // Sign the transaction with private keys
            const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

            //Check url
            urlExists(API_PATH, function(err, exists) {
                
                if (exists){

                // Send the transaction off to BigchainDB
                const conn = new driver.Connection(API_PATH)
                
                conn.postTransactionCommit(txSigned)
                    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))

                // conn.postTransactionCommit(txSigned).then(function(retrievedTx){
                //     console.log(retrievedTx)
                // }).catch (function(err){
                //     console.log(err);
                // })
                
                    resolve({status:200, data:payload._id})
                }
                else{
                    console.log("API_PATH not available"); // true 
                    reject({status:400, data:"Error"})
                }

            });

            
        }
        catch {
            reject({status:400, data:"Error"})
        }

    })

    

    
}

module.exports.saveToBigchain = saveToBigchain;