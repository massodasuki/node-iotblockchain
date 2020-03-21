const fetch = require('node-fetch');
const minCpu = 10;
var cpu = '';


function verifyCPU (host) {

    fetch(host)
        .then(res => res.json())
        .then(json => cpuJson = json);

        cpu = cpuJson.cpu;
        console.log(cpu);

        if (minCpu > cpu) 
        {
            return true;
        }
        
        return false;
}

module.exports.verifyCPU = verifyCPU;