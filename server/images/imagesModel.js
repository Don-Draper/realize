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
    "filename":"jesus4.svg",
    "trueUrl":"assets/jesus4.svg",
    "tag":"Freedom, Justice, Courage",
    "type":"icon"
  },
  {
    "filename":"jesus5.svg",
    "trueUrl":"assets/jesus5.svg",
    "tag":"Courage, Strength, Perseverance",
    "type":"icon"
  },
  {
    "filename":"fleurdelis4.svg",
    "trueUrl":"assets/fleurdelis4.svg",
    "tag":"Strength",
    "type":"icon"
  },
  {
    "filename":"bear22.svg",
    "trueUrl":"assets/bear22.svg",
    "tag":"Strength",
    "type":"icon"
  }, 
  {
    "filename":"u-blackletter.svg",
    "trueUrl":"assets/u-blackletter.svg",
    "tag":"Creativity",
    "type":"icon"
  },  
  {
    "filename":"t-blackletter.svg",
    "trueUrl":"assets/t-blackletter.svg",
    "tag":"Family, Love, Strength",
    "type":"icon"
  },  
  {
    "filename":"surfer.svg",
    "trueUrl":"assets/surfer.svg",
    "tag":"Nature, Harmony",
    "type":"icon"
  },  
  {
    "filename":"warrior2.svg",
    "trueUrl":"assets/warrior2.svg",
    "tag":"Creativity, Diligence",
    "type":"icon"
  },  
  { 
    "filename":"lion11.svg",
    "trueUrl":"assets/lion17.svg",
    "tag":"Perseverance",
    "type":"icon"
  },  
  {
    "filename":"lion5.svg",
    "trueUrl":"assets/lion5.svg",
    "tag":"Strength",
    "type":"icon"
  },  
  {
    "filename":"eagle8.svg",
    "trueUrl":"assets/eagle8.svg",
    "tag":"Creativity",
    "type":"icon"
  },  
  {
    "filename":"lion-3.svg",
    "trueUrl":"assets/lion-3.svg",
    "tag":"Creativity",
    "type":"icon"
  }, 
  {
    "filename":"a-anglican.svg",
    "trueUrl":"assets/a-anglican.svg",
    "tag":"Creativity",
    "type":"icon"
  },
  {
    "filename":"b-anglican.svg",
    "trueUrl":"assets/b-anglican.svg",
    "tag":"Creativity",
    "type":"icon"
  }

];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      });

   Image.collection.insertMany(data, function(err,r) {
    assert.equal(null, err);
    assert.equal(14, r.insertedCount);
   });

module.exports = Image;









