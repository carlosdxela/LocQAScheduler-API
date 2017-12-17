var mongoose = require('mongoose');
var assignmentSchema = new mongoose.Schema({
  id: String,
  language: String,
  tester: { type: mongoose.Schema.Types.ObjectId, ref: 'Tester'}
},{
  timestamps: true
});

var Assignments = mongoose.model('Assignments',assignmentSchema);

module.exports = Assignments;
