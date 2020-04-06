const cron = require('node-cron');
// const express = require('express');

var host = 'http://192.168.15.17:5000';

var verify = require('../controller/verifyCPU');
var bioTransation = require('../controller/processBiodata');

function startCron () {
  cron.schedule("* * * * *", () => {
    console.log('Cron Started');
    var endpoint_cpu = '/cpu';
    var endpoint_post_data = '/biodata';

    verify.verifyCPU(host + endpoint_cpu).then(function(status){

      if (status.data == true) {
        var url = host + endpoint_post_data;
        bioTransation.transferBiodata(host + endpoint_post_data);
      }
        else 
      {
        console.log('CPU not ready');
        return Promise.resolve({status:200, data:false})
      }

    }).catch(function(err){

    }).then(function(status){

        // console.log(status);
        console.log('Transfer completed');
        return Promise.resolve({status:200})

    });

  });
}

module.exports.startCron = startCron;
//app = express();
//app.listen(8000);
