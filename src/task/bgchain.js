
//https://www.npmjs.com/package/bigchaindb-driver
// BigchainDB server instance (e.g. https://example.com/api/v1/)
const driver = require('bigchaindb-driver')
// BigchainDB server instance (e.g. https://example.com/api/v1/)
// const API_PATH = 'http://localhost:9984/api/v1/' 

const API_PATH = 'https://test.bigchaindb.com/api/v1/'


function saveToBigchain (payload){
    return new Promise(function(resolve, reject){
        console.log(payload.age);
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
        
        // Send the transaction off to BigchainDB
        const conn = new driver.Connection(API_PATH)
        
        conn.postTransactionCommit(txSigned)
            .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
    })

    
}

module.exports.saveToBigchain = saveToBigchain;