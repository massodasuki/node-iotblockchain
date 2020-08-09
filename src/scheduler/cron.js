const cron = require('node-cron');
var config = require('../config/config')
// const express = require('express');

var host = 'http://' + config.host_ip + config.host_port;

var verify = require('../controller/verifyCPU');
var bioTransation = require('../controller/processBiodata');

function startCron () {
  cron.schedule("*/5 * * * * *", () => {
  // cron.schedule("* 20 * * * *", () => {
    console.log('Cron Started');
    var endpoint_cpu = '/cpu';
    var endpoint_post_data = '/biodata';

    verify.verifyCPU(host + endpoint_cpu).then(function(status){

      if (status.data == true) {

        console.log('CPU Ready');
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
        console.log('Cron Complete');
        return Promise.resolve({status:200})

    });

  });
}


function startCronWithoutCheckCPU () {
  cron.schedule("*/5 * * * * *", () => {
  // cron.schedule("* 20 * * * *", () => {
    console.log('Cron Started');
    var endpoint_post_data = '/biodata';
    bioTransation.transferBiodata(host + endpoint_post_data);
    console.log('Cron Complete');
    return Promise.resolve({status:200})

    // });

  });
}

module.exports.startCronWithoutCheckCPU = startCronWithoutCheckCPU;
module.exports.startCron = startCron;
