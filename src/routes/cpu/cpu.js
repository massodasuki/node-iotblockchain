var express = require('express');
var router = express.Router();

var checkCpu = require('../../jobs/cpu');

/*IOT Machine */
router.get('/cpu/', function(req, res, next) {
  var cpu = '';
    cpu = checkCpu.readCPUpercentage();
    res.status(200).send({cpu_percent:cpu})

});

module.exports = router;

