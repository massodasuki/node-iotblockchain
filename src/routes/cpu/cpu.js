var express = require('express');
var router = express.Router();

var checkCpu = require('../../task/cpu');

/*IOT Machine */
router.get('/cpu/', function(req, res, next) {
    var cpu = '';
    
    checkCpu.readCPUpercentage().
      then(function(status){
        cpu = status.data;

        str_cpu = parseFloat(cpu);
        console.log("CPU is " + str_cpu);
        res.status(200).json( {"cpu_percent": str_cpu } )

    }).catch(function(err){
        res.status(200).json( {"cpu_percent": "none" })
    });

});

module.exports = router;

