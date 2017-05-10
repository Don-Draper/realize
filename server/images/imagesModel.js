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
    "filename":"amflag.png",
    "trueUrl":"http://localhost:4000/assets/amflag.png",
    "tag":"Freedom, Justice, Courage"
  },
  {
    "filename":"blue-lion-open-mouth.png",
    "trueUrl":"http://localhost:4000/assets/blue-lion-open-mouth.png",
    "tag":"Courage, Strength, Perseverance"
  },
  {
    "filename":"power.jpg",
    "trueUrl":"http://localhost:4000/assets/power.jpg",
    "tag":"Strength"
  },
  {
    "filename":"amflag-eagle.png",
    "trueUrl":"http://localhost:4000/assets/amflag-eagle.png",
    "tag":"Freedom, Justice, Strength"
  }, 
  {
    "filename":"black-and-white-star.png",
    "trueUrl":"http://localhost:4000/assets/black-and-white-star.png",
    "tag":"Creativity"
  },  
  {
    "filename":"family-blue.png",
    "trueUrl":"http://localhost:4000/assets/family-blue.png",
    "tag":"Family, Love, Strength"
  },  
  {
    "filename":"seed-of-life.png",
    "trueUrl":"http://localhost:4000/assets/seed-of-life.png",
    "tag":"Nature, Harmony"
  },  
  {
    "filename":"goal-play.png",
    "trueUrl":"http://localhost:4000/assets/goal-play.png",
    "tag":"Creativity, Diligence"
  },  
  {
    "filename":"perseverance.jpg",
    "trueUrl":"http://localhost:4000/assets/perseverance.jpg",
    "tag":"Perseverance"
  },  
  {
    "filename":"blue-bull.png",
    "trueUrl":"http://localhost:4000/assets/blue-bull.png",
    "tag":"Strength"
  },  
  {
    "filename":"creativity.png",
    "trueUrl":"http://localhost:4000/assets/creativity.png",
    "tag":"Creativity"
  },  
  {
    "filename":"paintbrush.png",
    "trueUrl":"http://localhost:4000/assets/paintbrush.png",
    "tag":"Creativity"
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