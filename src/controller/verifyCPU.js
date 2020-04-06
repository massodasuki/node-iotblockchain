const fetch = require('node-fetch');
const minCpu = 50;

function verifyCPU (host) {
    return new  Promise(function (resolve, reject) {
        let settings = { method: "Get" };

        fetch(host, settings)
            .then(res => res.json())
            .then((json) => {
                // do something with JSON
                if ( json.cpu_percent < minCpu){
                    resolve({status:200, data:true})
                }
                resolve({status:200, data:false});
            });
    })
}

module.exports.verifyCPU = verifyCPU;