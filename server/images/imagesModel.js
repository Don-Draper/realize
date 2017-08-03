var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');

var ImageSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true
  },
  type: String,
  trueUrl: String,
  watermarkedUrl: String,
  tag: String,
  description: String

});

var Image = mongoose.model('Image', ImageSchema);

var data = [
  {
    "filename":"jesus31.svg",
    "trueUrl":"assets/jesus31.svg",
    "tag":"jesus",
    "type":"icon"
  },
  {
    "filename":"eagle29.svg",
    "trueUrl":"assets/eagle29.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle12.svg",
    "trueUrl":"assets/eagle12.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"a-blackletter.svg",
    "trueUrl":"assets/a-blackletter.svg",
    "tag":"letter",
    "type":"icon"
  }

];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      });

   // Image.collection.insertMany(data, function(err,r) {
   //  assert.equal(null, err);
   //  assert.equal(4, r.insertedCount);
   // });

module.exports = Image;