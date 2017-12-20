var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Projects = require('../models/project');
var Assignments = require('../models/assignment');
var Tasks = require('../models/task');

var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

module.exports = projectRouter;

projectRouter.route('/')
.get(function(req, res, next){
  console.log("Received get request on /projects.");
  Projects.find({}, function(err, project){
    if(err) throw err;
    res.json(project);
  });
})
.post(function(req, res, next){
  console.log("Received post request on /projects/ with " + JSON.stringify(req.body));
  Projects.create(req.body, function(err, project){
    if (err) throw err;
    if (!project)
    {
      sendJSONresponse(res, 404, {"message":"Projects is undefined."});
    }
    else {
      if (err) {
        console.log("Found error " + err);
        throw err};
      var id = project._id;
      console.log('Project created! with id: ' + id);
      res.json(project);
    }


  })
});

projectRouter.route('/:projectId')
.get(function(req, res, next){
  console.log("Received get request on /projects/:projectId");
      Projects.findById(req.params.projectId,
        function(err, project){
        if (err) throw err;
        res.json(project);
      });
})

.put(function(req, res, next){
  console.log("Received put request on /projects/:projectId with " + JSON.stringify(req.body));
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
  Projects.findByIdAndRemove(req.params.projectId,
    function (err, resp) {
      if (err) throw err;
      res.json(resp);
  });
});

projectRouter.route('/:projectId/tasks')
.get(function(req, res, next){
  console.log("Received get at /projects/:projectId/tasks ");
  Projects.findById(req.params.projectId)
    .exec(function (err, project){
      if(err) next(err);
      res.json(project.tasks);
    });
})
.post(function(req, res, next){
  console.log("Received post request at /projects/:projectId/tasks with " + JSON.stringify(req.body));
  Projects.findById(req.params.projectId, function(err, project){
    if(err) next(err);
    var newTask = new Tasks();
    newTask.taskName = req.body.taskName;
    newTask.startDate = req.body.startDate;
    newTask.finishDate = req.body.finishDate;
    console.log("langs:"+ project.languages + " " + project.languages.length);
    //for (lang in project.languges)
    for (i = 0; i < project.languages.length; i++)
    {
      var assignment = new Assignments({
        language: project.languages[i],
        tester: ''
      });
      newTask.assignments.push(assignment);
      console.log("New Task: "+ newTask);
    }
    project.tasks.push(newTask);
    project.save(function(err, project){
      if(err) next(err);
      console.log("Added new Task.");
      res.json(project);
    });
  });
});

projectRouter.route('/:projectId/tasks/:taskId')
.get(function(req, res, next){
  console.log("Received get requests in /projects/:projectId/tasks/:taskId");
  Projects.findById(req.params.projectId)
    .exec(function(err, project){
      if(err) next(err);
      res.json(project.tasks.id(req.params.taskId));
    });
})
.put(function(req, res, next){
  console.log("Received put request at /projects/:projectId/tasks/:taskId");
  Projects.findById(req.params.projectId, function(err, project){
    if(err) next(err);
    //project.tasks.id(req.params.taskId).remove();
    project.tasks.pull(req.params.taskId);
    project.tasks.push(req.body);
    project.save(function(err, project){
      if(err) next(err);
      console.log('Updated task');
      res.json(project);
    });
  });
})
.delete(function(req, res, next){
  console.log("Received put request at /projects/:projectId/tasks/:taskId");
  Projects.findById(req.params.projectId, function(err, project){
    if (err) next(err);
    //project.tasks.id(req.params.taskId).remove();
    project.tasks.pull(req.params.taskId);
    project.save(function(err, resp){
      if(err) next(err);
      res.json(resp);
    });
  });
});

projectRouter.route('/:projectId/tasks/:taskId/assignments')
.get(function(req, res, next){
  Projects.findById(req.params.projectId)
    .exec(function(err, project){
      if(err) next(err);
      var task = project.tasks.id(req.params.taskId);
      res.json(task.assignments);
    });
})
.put(function(req, res, next){
  if (!req.query.lang){
    //need to return error message
  }
  else{
    var lang = req.query.lang;
    console.log("Ready to process update on assignment for language " + lang);
    Projects.findById(req.params.projectId)
      .exec(function(err, project){
        if(err) next(err);
        var task = project.tasks.id(req.params.taskId);
        for (i = 0; i < task.assignments.length; i++)
        {
          if (task.assignments[i].language == lang){
            if (req.body.tester){
              task.assignments[i].tester = req.body.tester;
            }
          }
        }
        res.json(task.assignments);
      });
  }

});
