var express = require('express');
var bodyParser = require('body-parser');
var mongoose = requireq('mongoose');

var Testers = require('../models/tester');

var testerRouter = express.Router();
testerRouter.use(bodyParser.json());

module.exports = testerRouter;

testerRouter.route('/')
.get(function(req, res, next){

})
.post(function(req, res, next){

});

testerRouter.route('/:testerId')
.get(function(req, res, next){

}),
.post(function(req, res, next){

}),
.put(function(req, res, next){

})
.delete(function(req, res, next){

});
