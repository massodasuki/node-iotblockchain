var express = require('express');
var router = express.Router();
const XLSX = require('xlsx');
path = require('path');
path.join(__dirname, '../test/karma.conf.js'),


router.get('/direct/', function(req, res, next) {

    var workbook = XLSX.readFile(path.join(__dirname, '/../../assets/dataset.xlsx'));// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
    var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheet

    res.render('direct', {
        title:'Client',
        dataset : JSON.stringify(data)
    });

});

module.exports = router;