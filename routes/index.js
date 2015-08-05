var express = require('express');
var request = require('request');
var Mocha = require('mocha');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { results: ['Not run'] });
});

function runMochaTests(callback) {
  var mocha = new Mocha();

  mocha.addFile('test/people-tests.js');

  var output = [];

  mocha.run(function () {

    if (callback != undefined) {
      callback(output);
    }
  }).on('pass', function(test) {
    output.push({status: "PASSED"});
    console.log(test);
  }).on('fail', function(test) {
    output.push({status:"FAILED",detail:test.err.message});

    console.log(test);
  });
}

/* GET home page. */
router.post('/runs', function(req, res, next) {
  runMochaTests(function (output) {
    res.render('index', { results: output });
  });
});

module.exports = router;
