var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Projects = require('../models/project');

var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

module.exports = projectRouter;

projectRouter.route('/')
.get(function(req, res, next){
  Projects.find({}, function(err, project){
    if(err) throw err;
    res.json(project);
  });
})
.post(function(req, res, next){
  Projects.create(req.body, function(err, project){
    if (err) throw err;

    console.log('Project created!');
    var id = project._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the project with id: ' + id);
  })
});

projectRouter.route('/:projectId')
.get(function(req, res, next){
      Projects.findById(req.params.projectId,
        function(err, project){
        if (err) throw err;
        res.json(project);
      });
})

.put(function(req, res, next){
  Projects.findByIdAndUpdate(req.params.projectId, {
    $set: req.body
  }, {
    new: true
  }, function(err, project){
    if(err) throw err;
    res.json(project);
  });
})
.delete(function(req, res, next){
  Projects.findByIdAndRemove(req.params.pojectId,
    function (err, resp) {        if (err) throw err;
      res.json(resp);
  });
});
