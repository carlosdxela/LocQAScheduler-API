var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Projects = require('../models/project');
var Assignments = require('../models/assignment');
var Tasks = require('../models/task');
var Testers = require('../models/tester');

var allassignmentsRouter = express.Router();
allassignmentsRouter.use(bodyParser.json());

module.exports = allassignmentsRouter;

allassignmentsRouter.route('/')
.get(function(req, res, next){
  console.log("Received get request on /assignments.");
  var flatAssignments;
  var flatAssignment;
  Projects.find()
    .exec(function(err, projects){
    if(err) throw err;
    //console.log(JSON.stringify(projects));
    console.log(JSON.stringify(projects));
    console.log("projects "+projects.length);
    for (var project in projects) {

      if (project.tasks)
      console.log("tasks " + project.tasks.length);
      for (var task in project.tasks){
        if (task.assignments)
        console.log("assignments " + task.assignments.length);
        for (var assignment in task.assignments){
          flatAssignment.projectId = project.id;
          flatAssignment.projectName = project.projectName;
          flatAssignment.taskId = task.id;
          flatAssignment.taskName = task.TaskName;
          flatAssignment.testerId = assignment.tester;
          console.log(flatAssignment.json());
          flatAssignments.push(flatAssignment);
        }
      }
    }
  });
  res.json(flatAssignments);
})
