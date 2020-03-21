var express = require('express');
var fun_url = require('url');
var http = require("http");
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var url = "mongodb://localhost:27017/";
var querystring = require('querystring');

var host = 'http://127.168.0.0:3000/systems/'

const fetch = require('node-fetch');
const minCpu = 10;
var cpu = ''
var func_CPU = require('./cpu')


/*This will be use by cron job*/


/* Retrive internal DATABASE and send to IoT Machine. */
router.get('/transactions/', function(req, res, next) {

  fetch(host)
  .then(res => res.json())
  .then(json => cpuJson = json);

  cpu = cpuJson.cpu;
  console.log(cpu);

  signal = func_CPU.getCPUStatus(minCpu, cpu)

  if (signal == true){

      console.log("inside")

      MongoClient.connect( url,
      { useNewUrlParser: true },
      { useUnifiedTopology: true },
      function(err, db) {
          if (err) throw err;

          var data = ''
          var dbo = db.db("mydb");

          /* GET first data in database*/
          dbo.collection("insurans").findOne({}, function(err, result) {
              if (err) throw err;

              data = result;
              console.log("Successfully get data");
              });

          /* POST data into IoT machine CPU using POST curl*/


          /*If success delete database. */


          db.close();

      }); //MongoClient

   }

   console.log("outside")



  // res.send('respond with a resource');

}); //router

module.exports = router;
