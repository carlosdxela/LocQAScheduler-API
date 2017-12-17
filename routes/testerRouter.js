var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Testers = require('../models/tester');

var testerRouter = express.Router();
testerRouter.use(bodyParser.json());

module.exports = testerRouter;

testerRouter.route('/')
.get(function(req, res, next){
  Testers.find({},function(err, tester){
    if(err) throw err;
    res.json(tester);
  })
})
.post(function(req, res, next){
  Testers.create(req.body, function(err, tester){
    if (err) throw err;

    console.log('Tester created!');
    var id = tester._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the tester with id: ' + id);
  })
});

testerRouter.route('/:testerId')
.get(function(req, res, next){
  Testers.findById(req.params.testerId, function(err, tester){
    if (err) throw err;
    res.json(tester);
  });
})
.put(function(req, res, next){
  Testers.findByIdAndUpdate(req.params.testerId, {
    $set: req.body
  }, {
    new: true
  }, function(err, tester){
    if(err) throw err;
    res.json(tester);
  });
})
.delete(function(req, res, next){
  Testers.findByIdAndRemove(req.params.testerId,
    function (err, resp) {        if (err) throw err;
      res.json(resp);
  });
});
