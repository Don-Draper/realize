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
    "filename":"amflag.png",
    "trueUrl":"assets/amflag.png",
    "tag":"Freedom, Justice, Courage",
    "type":"icon"
  },
  {
    "filename":"blue-lion-open-mouth.png",
    "trueUrl":"assets/blue-lion-open-mouth.png",
    "tag":"Courage, Strength, Perseverance",
    "type":"icon"
  },
  {
    "filename":"power.jpg",
    "trueUrl":"assets/power.jpg",
    "tag":"Strength",
    "type":"icon"
  },
  {
    "filename":"bear-coin2.svg",
    "trueUrl":"assets/bear-coin2.svg",
    "tag":"Strength",
    "type":"icon"
  }, 
  {
    "filename":"black-and-white-star.png",
    "trueUrl":"assets/black-and-white-star.png",
    "tag":"Creativity",
    "type":"icon"
  },  
  {
    "filename":"family-blue.png",
    "trueUrl":"assets/family-blue.png",
    "tag":"Family, Love, Strength",
    "type":"icon"
  },  
  {
    "filename":"seed-of-life.png",
    "trueUrl":"assets/seed-of-life.png",
    "tag":"Nature, Harmony",
    "type":"icon"
  },  
  {
    "filename":"goal-play.png",
    "trueUrl":"assets/goal-play.png",
    "tag":"Creativity, Diligence",
    "type":"icon"
  },  
  {
    "filename":"perseverance.jpg",
    "trueUrl":"assets/perseverance.jpg",
    "tag":"Perseverance",
    "type":"icon"
  },  
  {
    "filename":"blue-bull.png",
    "trueUrl":"assets/blue-bull.png",
    "tag":"Strength",
    "type":"icon"
  },  
  {
    "filename":"creativity.png",
    "trueUrl":"assets/creativity.png",
    "tag":"Creativity",
    "type":"icon"
  },  
  {
    "filename":"paintbrush.png",
    "trueUrl":"assets/paintbrush.png",
    "tag":"Creativity",
    "type":"icon"
  }

];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      });

   // Image.collection.insertMany(data, function(err,r) {
   //  assert.equal(null, err);
   //  assert.equal(12, r.insertedCount);
   // });

module.exports = Image;