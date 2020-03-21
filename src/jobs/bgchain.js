
//https://www.npmjs.com/package/bigchaindb-driver
// BigchainDB server instance (e.g. https://example.com/api/v1/)
const API_PATH = 'http://localhost:9984/api/v1/'

function saveToBigchain (payload){

    const alice = new BigchainDB.Ed25519Keypair()

    const tx = BigchainDB.Transaction.makeCreateTransaction (
        
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
        [ BigchainDB.Transaction.makeOutput(
                BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
        ],
        alice.publicKey
    )

    // Sign the transaction with private keys
    const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey)
    
    // Send the transaction off to BigchainDB
    let conn = new BigchainDB.Connection(API_PATH)
    conn.postTransactionCommit(txSigned)
        .then(res => {
            var txn =  txSigned.id;
        })

    return txn;

}

module.exports.saveToBigchain = saveToBigchain;