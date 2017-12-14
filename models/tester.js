var mongoose = require('mongoose');
var testerSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  alias: String,
  email: String,
  languages: String[]
});
mongoose.model('Tester',testerSchema);
