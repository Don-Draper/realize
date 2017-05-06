var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');

var ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  trueUrl: String,
  watermarkedUrl: String,
  tag: String,
  description: String

});

var Image = mongoose.model('Image', ImageSchema);

var data = [
  {
    "filename":"amflag-shield.png",
    "trueUrl":"http://localhost:4000/assets/amflag-shield.png",
    "tag":"patriotic"
  },
  {
    "filename":"blue-lion-open-mouth.png",
    "trueUrl":"http://localhost:4000/assets/blue-lion-open-mouth.png",
    "tag":"courage"
  },
  {
    "filename":"power.jpg",
    "trueUrl":"http://localhost:4000/assets/power.jpg",
    "tag":"technology"
  }   

];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      });

   // Image.collection.insertMany(data, function(err,r) {
   //  assert.equal(null, err);
   //  assert.equal(3, r.insertedCount);
   // });

module.exports = Image;