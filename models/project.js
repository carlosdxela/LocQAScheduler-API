var mongoose = require('mongoose');
var assignmentSchema = new mongoose.Schema({
  id: String,
  language: String,
  tester: { type: mongoose.Schema.Types.ObjectId, ref: 'Tester'}
},{
  timestamps: true
});

var taskSchema = new mongoose.Schema({
  id: String,
  taskName: String,
  startDate: Date,
  finishDate: Date,
  assignments: [assignmentSchema]
},{
  timestamps: true
});

var projectSchema = new mongoose.Schema({
  id: String,
  projectName: String,
  languages: [String],
  tasks: [taskSchema]
},{
  timestamps: true
});

var Projects = mongoose.model('Project',projectSchema);
module.exports = Projects;
