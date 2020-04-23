const fetch = require('node-fetch');
var config = require('../config/config');
const minCpu = config.cpu_min;

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