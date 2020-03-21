var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Biodata = mongoose.model('Biodata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
  
module.exports = router;