const cron = require('node-cron');
const express = require('express');

var host = 'http://127.168.0.0:3000';

var verify = require('../controller/verifyCPU');
var bioTransation = require('../controller/processBiodata');

cron.schedule("* * * * *", () => {
  var endpoint_cpu = '/cpu';
  var endpoint_post_data = '';

  status = verify.verifyCPU(host + endpoint_cpu);

  if (status)
  {
    bioTransation.transferBiodata(host + endpoint_post_data);
    console.log('Transfer completed');
  }
  else 
  {
    console.log('CPU not ready')
  }
  console.log(`this message logs every minute`);

});

app = express();
app.listen(8000);
