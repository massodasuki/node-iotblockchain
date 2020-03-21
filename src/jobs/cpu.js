var osu = require('node-os-utils')
var cpu = osu.cpu

/*IOT Machine */
function readCPUpercentage (){
    var percent;
    cpu.usage()
        .then(cpuPercentage => {
        percent = cpuPercentage;
        console.log(cpuPercentage) // 10.38
    })

    return percent;
}

module.exports.readCPUpercentage = readCPUpercentage;