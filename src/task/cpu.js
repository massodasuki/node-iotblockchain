var osu = require('node-os-utils')
var cpu = osu.cpu

/*IOT Machine */
function readCPUpercentage (){
    return new Promise(function(resolve, reject) {
        cpu.usage()
        .then(function(status){
            // console.log(status);
            percent = status;
            if(status) {

                resolve({
                    ok: 200,
                    data: percent
                })

            }
        })
    })
}

module.exports.readCPUpercentage = readCPUpercentage;