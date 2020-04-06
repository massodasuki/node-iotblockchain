var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Biodata = mongoose.model('Biodata');
const XLSX = require('xlsx');

const file = path.join(__dirname, '../../assets/dataset.xlsx');

// Excell 

var workbook = XLSX.readFile(file);// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheet

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blockchain', dataset : JSON.stringify(data)});
});


/* POST save insurans data in mongodb database */
router.post('/biodata/', function(req, res, next) {

    var biodata = new Biodata({
        _id: new mongoose.Types.ObjectId(),
        age: req.body.age,
        sex: req.body.sex,
        bmi: req.body.bmi,
        smoker: req.body.smoker,
        region: req.body.region,
        charge: req.body.charge
        });

        biodata.save(function(err) {
            if (err) throw err;
             
            console.log('Author successfully saved.');
        });
  
    return res.redirect('/');
});

router.get('/biodata/', function(req, res, next) {

    Biodata.find({age: 'a'}, function(error, data) {
        console.log(data); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
    });

  return res.redirect('/');
});

router.delete('/biodata/', function(req, res, next) {

  var biodata = new Biodata({
      _id: new mongoose.Types.ObjectId(),
      age: req.body.age,
      sex: req.body.sex,
      bmi: req.body.bmi,
      smoker: req.body.smoker,
      region: req.body.region,
      charge: req.body.charge
      });

      biodata.save(function(err) {
          if (err) throw err;
           
          console.log('Author successfully saved.');
      });

  return res.redirect('/');
});

//TODO: update
// router.post('/biodata/', function(req, res, next) {

//   var biodata = new Biodata({
//       _id: new mongoose.Types.ObjectId(),
//       age: req.body.age,
//       sex: req.body.sex,
//       bmi: req.body.bmi,
//       smoker: req.body.smoker,
//       region: req.body.region,
//       charge: req.body.charge
//       });

//       biodata.save(function(err) {
//           if (err) throw err;
           
//           console.log('Author successfully saved.');
//       });

//   return res.redirect('/');
// });
  
module.exports = router;