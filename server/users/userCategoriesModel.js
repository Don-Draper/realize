var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserCategorySchema = new Schema({
  username: String,
  name: String,
  beliefs: [String]
});

module.exports = mongoose.model('userCategories', UserCategorySchema);