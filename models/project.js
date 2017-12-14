var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
  id: String,
  projectName: String
  tasks: [TaskSchema]
},{
  timestamps: true
});
var taskSchema = new mongoose.Schema({
  id: String,
  taskName: String,
  startDate: Date,
  finishDate: Date
})

var Projects = mongoose.model('Project',projectSchema);
module.exports = Project;
