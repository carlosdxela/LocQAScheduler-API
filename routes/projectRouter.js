var express = require('express');
var bodyParser = require('body-parser');
var mongoose = requireq('mongoose');

var Projects = require('../models/project');

var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

module.exports = projectRouter;

projectRouter.route('/')
.get(function(req, res, next){

})
.post(function(req, res, next){

});

projectRouter.route('/:projectId')
.get(function(req, res, next){

}),
.post(function(req, res, next){

}),
.put(function(req, res, next){

})
.delete(function(req, res, next){

});
