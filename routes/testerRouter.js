var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Testers = require('../models/tester');

var testerRouter = express.Router();
testerRouter.use(bodyParser.json());

module.exports = testerRouter;

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

testerRouter.route('/')
.get(function(req, res, next){
  console.log("Received get on /tester.");
  Testers.find({},function(err, tester){
    if(err) throw err;
    res.json(tester);
  })
})
.post(function(req, res, next){
  console.log("Received post on /tester.");
  console.log("Received tester "+ req.body);
  Testers.create(req.body, function(err, tester){

    if (!tester)
    {
      sendJSONresponse(res, 404, {"message":"Testers is undefined."});
    }
    else {
      if (err) {
        console.log("Found error " + err);
        throw err};
      var id = tester._id;
      console.log('Tester created! with id: ' + id);
      res.json(tester);
    }
  })
});

testerRouter.route('/:testerId')
.get(function(req, res, next){
  console.log("Received get on " + req.params.testerId);
  Testers.findById(req.params.testerId, function(err, tester){
    if (err) throw err;
    res.json(tester);
  });
})
.put(function(req, res, next){
  console.log("Received put for Tester on " + req.params.testerId + " for " + JSON.stringify(req.body));
  // Testers.findById(req.params.testerId, function(err, tester){
  //   if (err) throw err;
  //   tester.firstName = req.body.firstName;
  //   tester.lastName = req.body.lastName;
  //   tester.languages = req.body.languages;
  //   tester.alias = req.body.alias;
  //   tester.email = req.body.email;
  //   tester.save(function(err){
  //     if (err) res.send(err);
  //     res.json(tester);
  //   })
  // })
  Testers.findByIdAndUpdate(req.params.testerId, {
    $set: req.body
  }, {
    new: true
  }, function(err, tester){
    if(err) throw err;
    console.log("Updated tester:" + JSON.stringify(tester) +"-" + JSON.stringify(req.body));
    res.json(tester);
  });
})
.delete(function(req, res, next){
  console.log("Received delete on " + req.params.testerId);
  Testers.findByIdAndRemove(req.params.testerId,
    function (err, resp) {        if (err) throw err;
      res.json(resp);
  });
});
