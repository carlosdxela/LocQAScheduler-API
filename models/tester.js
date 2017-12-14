var mongoose = require('mongoose');
var testerSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  alias: String,
  email: String,
  languages: [String]
},{
  timestamps: true
});
var Testers = mongoose.model('Tester',testerSchema);
module.exports = Testers;
