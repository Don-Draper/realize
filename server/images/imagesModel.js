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
    "filename":"bear8.svg",
    "trueUrl":"assets/bear8.svg",
    "tag":"bear",
    "type":"icon"
  },
  {
    "filename":"bear13.svg",
    "trueUrl":"assets/bear13.svg",
    "tag":"bear",
    "type":"icon"
  },
  {
    "filename":"bear5.svg",
    "trueUrl":"assets/bear5.svg",
    "tag":"bear",
    "type":"icon"
  },
  {
    "filename":"bear6.svg",
    "trueUrl":"assets/bear6.svg",
    "tag":"bear",
    "type":"icon"
  },
  {
    "filename":"bear21.svg",
    "trueUrl":"assets/bear21.svg",
    "tag":"bear",
    "type":"icon"
  },
  {
    "filename":"bull.svg",
    "trueUrl":"assets/bull.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"bull8.svg",
    "trueUrl":"assets/bull8.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"bull6.svg",
    "trueUrl":"assets/bull6.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"bull9.svg",
    "trueUrl":"assets/bull9.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"bull12.svg",
    "trueUrl":"assets/bull12.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"bull13.svg",
    "trueUrl":"assets/bull13.svg",
    "tag":"bull",
    "type":"icon"
  },
  {
    "filename":"deer.svg",
    "trueUrl":"assets/deer.svg",
    "tag":"deer",
    "type":"icon"
  },
  {
    "filename":"deer3.svg",
    "trueUrl":"assets/deer3.svg",
    "tag":"deer",
    "type":"icon"
  },
  {
    "filename":"deer8.svg",
    "trueUrl":"assets/deer8.svg",
    "tag":"deer",
    "type":"icon"
  },
  {
    "filename":"deer16.svg",
    "trueUrl":"assets/deer16.svg",
    "tag":"deer",
    "type":"icon"
  },
  {
    "filename":"deer12.svg",
    "trueUrl":"assets/deer12.svg",
    "tag":"deer",
    "type":"icon"
  },
  {
    "filename":"eagle3.svg",
    "trueUrl":"assets/eagle3.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle4.svg",
    "trueUrl":"assets/eagle4.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle7.svg",
    "trueUrl":"assets/eagle7.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle15.svg",
    "trueUrl":"assets/eagle15.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle22.svg",
    "trueUrl":"assets/eagle22.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle26.svg",
    "trueUrl":"assets/eagle26.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"eagle29.svg",
    "trueUrl":"assets/eagle29.svg",
    "tag":"eagle",
    "type":"icon"
  },
  {
    "filename":"fleurdelis.svg",
    "trueUrl":"assets/fleurdelis.svg",
    "tag":"fleurdelis",
    "type":"icon"
  },
  {
    "filename":"fleurdelis4.svg",
    "trueUrl":"assets/fleurdelis4.svg",
    "tag":"fleurdelis",
    "type":"icon"
  },
  {
    "filename":"fleurdelis3.svg",
    "trueUrl":"assets/fleurdelis3.svg",
    "tag":"fleurdelis",
    "type":"icon"
  },
  {
    "filename":"fleurdelis5.svg",
    "trueUrl":"assets/fleurdelis5.svg",
    "tag":"fleurdelis",
    "type":"icon"
  },
  {
    "filename":"fleurdelis2.svg",
    "trueUrl":"assets/fleurdelis2.svg",
    "tag":"fleurdelis",
    "type":"icon"
  },
  {
    "filename":"horse.svg",
    "trueUrl":"assets/horse.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse4.svg",
    "trueUrl":"assets/horse4.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse2.svg",
    "trueUrl":"assets/horse2.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse5.svg",
    "trueUrl":"assets/horse5.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse6.svg",
    "trueUrl":"assets/horse6.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse18.svg",
    "trueUrl":"assets/horse18.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"horse27.svg",
    "trueUrl":"assets/horse27.svg",
    "tag":"horse",
    "type":"icon"
  },
  {
    "filename":"lion27.svg",
    "trueUrl":"assets/lion27.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion18.svg",
    "trueUrl":"assets/lion18.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion19.svg",
    "trueUrl":"assets/lion19.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion9.svg",
    "trueUrl":"assets/lion9.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion8.svg",
    "trueUrl":"assets/lion8.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion20.svg",
    "trueUrl":"assets/lion20.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion7.svg",
    "trueUrl":"assets/lion7.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion25.svg",
    "trueUrl":"assets/lion25.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion28.svg",
    "trueUrl":"assets/lion28.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion31.svg",
    "trueUrl":"assets/lion31.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion37.svg",
    "trueUrl":"assets/lion37.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion36.svg",
    "trueUrl":"assets/lion36.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion38.svg",
    "trueUrl":"assets/lion38.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion39.svg",
    "trueUrl":"assets/lion39.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion40.svg",
    "trueUrl":"assets/lion40.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion41.svg",
    "trueUrl":"assets/lion41.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion44.svg",
    "trueUrl":"assets/lion44.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion45.svg",
    "trueUrl":"assets/lion45.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion47.svg",
    "trueUrl":"assets/lion47.svg",
    "tag":"lion",
    "type":"icon"
  },
  {
    "filename":"lion48.svg",
    "trueUrl":"assets/lion48.svg",
    "tag":"lion",
    "type":"icon"
  }


  // {
  //   "filename":"jesus31.svg",
  //   "trueUrl":"assets/jesus31.svg",
  //   "tag":"jesus",
  //   "type":"icon"
  // },
  // {
  //   "filename":"a-blackletter.svg",
  //   "trueUrl":"assets/a-blackletter.svg",
  //   "tag":"letter",
  //   "type":"icon"
  // },

];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      });


   // Image.collection.insertMany(data, function(err,r) {
   //  assert.equal(null, err);
   //  assert.equal(57, r.insertedCount);
   // });  


var data2 = [
  {
    "filename":"a-anglican.svg",
    "trueUrl":"assets/a-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"b-anglican.svg",
    "trueUrl":"assets/b-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"c-anglican.svg",
    "trueUrl":"assets/c-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"d-anglican.svg",
    "trueUrl":"assets/d-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"e-anglican.svg",
    "trueUrl":"assets/e-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"f-anglican.svg",
    "trueUrl":"assets/f-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"g-anglican.svg",
    "trueUrl":"assets/g-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"h-anglican.svg",
    "trueUrl":"assets/h-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"i-anglican.svg",
    "trueUrl":"assets/i-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"j-anglican.svg",
    "trueUrl":"assets/j-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"k-anglican.svg",
    "trueUrl":"assets/k-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"l-anglican.svg",
    "trueUrl":"assets/l-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"m-anglican.svg",
    "trueUrl":"assets/m-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"n-anglican.svg",
    "trueUrl":"assets/n-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"o-anglican.svg",
    "trueUrl":"assets/o-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"p-anglican.svg",
    "trueUrl":"assets/p-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"q-anglican.svg",
    "trueUrl":"assets/q-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"r-anglican.svg",
    "trueUrl":"assets/r-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"s-anglican.svg",
    "trueUrl":"assets/s-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"t-anglican.svg",
    "trueUrl":"assets/t-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"u-anglican.svg",
    "trueUrl":"assets/u-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"v-anglican.svg",
    "trueUrl":"assets/v-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"w-anglican.svg",
    "trueUrl":"assets/w-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"x-anglican.svg",
    "trueUrl":"assets/x-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"y-anglican.svg",
    "trueUrl":"assets/y-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"z-anglican.svg",
    "trueUrl":"assets/z-anglican.svg",
    "type":"initial"
  },
  {
    "filename":"a-blackletter.svg",
    "trueUrl":"assets/a-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"b-blackletter.svg",
    "trueUrl":"assets/b-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"c-blackletter.svg",
    "trueUrl":"assets/c-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"d-blackletter.svg",
    "trueUrl":"assets/d-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"e-blackletter.svg",
    "trueUrl":"assets/e-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"f-blackletter.svg",
    "trueUrl":"assets/f-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"g-blackletter.svg",
    "trueUrl":"assets/g-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"h-blackletter.svg",
    "trueUrl":"assets/h-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"i-blackletter.svg",
    "trueUrl":"assets/i-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"j-blackletter.svg",
    "trueUrl":"assets/j-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"k-blackletter.svg",
    "trueUrl":"assets/k-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"l-blackletter.svg",
    "trueUrl":"assets/l-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"m-blackletter.svg",
    "trueUrl":"assets/m-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"n-blackletter.svg",
    "trueUrl":"assets/n-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"o-blackletter.svg",
    "trueUrl":"assets/o-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"p-blackletter.svg",
    "trueUrl":"assets/p-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"q-blackletter.svg",
    "trueUrl":"assets/q-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"r-blackletter.svg",
    "trueUrl":"assets/r-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"s-blackletter.svg",
    "trueUrl":"assets/s-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"t-blackletter.svg",
    "trueUrl":"assets/t-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"u-blackletter.svg",
    "trueUrl":"assets/u-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"v-blackletter.svg",
    "trueUrl":"assets/v-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"w-blackletter.svg",
    "trueUrl":"assets/w-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"x-blackletter.svg",
    "trueUrl":"assets/x-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"y-blackletter.svg",
    "trueUrl":"assets/y-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"z-blackletter.svg",
    "trueUrl":"assets/z-blackletter.svg",
    "type":"initial"
  },
  {
    "filename":"a-fette-gotisch.svg",
    "trueUrl":"assets/a-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"b-fette-gotisch.svg",
    "trueUrl":"assets/b-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"c-fette-gotisch.svg",
    "trueUrl":"assets/c-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"d-fette-gotisch.svg",
    "trueUrl":"assets/d-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"e-fette-gotisch.svg",
    "trueUrl":"assets/e-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"f-fette-gotisch.svg",
    "trueUrl":"assets/f-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"g-fette-gotisch.svg",
    "trueUrl":"assets/g-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"h-fette-gotisch.svg",
    "trueUrl":"assets/h-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"i-fette-gotisch.svg",
    "trueUrl":"assets/i-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"j-fette-gotisch.svg",
    "trueUrl":"assets/j-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"k-fette-gotisch.svg",
    "trueUrl":"assets/k-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"l-fette-gotisch.svg",
    "trueUrl":"assets/l-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"m-fette-gotisch.svg",
    "trueUrl":"assets/m-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"n-fette-gotisch.svg",
    "trueUrl":"assets/n-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"o-fette-gotisch.svg",
    "trueUrl":"assets/o-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"p-fette-gotisch.svg",
    "trueUrl":"assets/p-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"q-fette-gotisch.svg",
    "trueUrl":"assets/q-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"r-fette-gotisch.svg",
    "trueUrl":"assets/r-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"s-fette-gotisch.svg",
    "trueUrl":"assets/s-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"t-fette-gotisch.svg",
    "trueUrl":"assets/t-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"u-fette-gotisch.svg",
    "trueUrl":"assets/u-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"v-fette-gotisch.svg",
    "trueUrl":"assets/v-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"w-fette-gotisch.svg",
    "trueUrl":"assets/w-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"x-fette-gotisch.svg",
    "trueUrl":"assets/x-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"y-fette-gotisch.svg",
    "trueUrl":"assets/y-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"z-fette-gotisch.svg",
    "trueUrl":"assets/z-fette-gotisch.svg",
    "type":"initial"
  },
  {
    "filename":"a-pamela.svg",
    "trueUrl":"assets/a-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"b-pamela.svg",
    "trueUrl":"assets/b-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"c-pamela.svg",
    "trueUrl":"assets/c-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"d-pamela.svg",
    "trueUrl":"assets/d-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"e-pamela.svg",
    "trueUrl":"assets/e-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"f-pamela.svg",
    "trueUrl":"assets/f-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"g-pamela.svg",
    "trueUrl":"assets/g-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"h-pamela.svg",
    "trueUrl":"assets/h-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"i-pamela.svg",
    "trueUrl":"assets/i-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"j-pamela.svg",
    "trueUrl":"assets/j-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"k-pamela.svg",
    "trueUrl":"assets/k-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"l-pamela.svg",
    "trueUrl":"assets/l-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"m-pamela.svg",
    "trueUrl":"assets/m-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"n-pamela.svg",
    "trueUrl":"assets/n-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"o-pamela.svg",
    "trueUrl":"assets/o-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"p-pamela.svg",
    "trueUrl":"assets/p-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"q-pamela.svg",
    "trueUrl":"assets/q-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"r-pamela.svg",
    "trueUrl":"assets/r-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"s-pamela.svg",
    "trueUrl":"assets/s-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"t-pamela.svg",
    "trueUrl":"assets/t-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"u-pamela.svg",
    "trueUrl":"assets/u-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"v-pamela.svg",
    "trueUrl":"assets/v-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"w-pamela.svg",
    "trueUrl":"assets/w-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"x-pamela.svg",
    "trueUrl":"assets/x-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"y-pamela.svg",
    "trueUrl":"assets/y-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"z-pamela.svg",
    "trueUrl":"assets/z-pamela.svg",
    "type":"initial"
  },
  {
    "filename":"bear.svg",
    "trueUrl":"assets/bear.svg",
    "type":"icon"
  },
  {
    "filename":"bear2.svg",
    "trueUrl":"assets/bear2.svg",
    "type":"icon"
  },
  {
    "filename":"bear3.svg",
    "trueUrl":"assets/bear3.svg",
    "type":"icon"
  },
  {
    "filename":"bear4.svg",
    "trueUrl":"assets/bear4.svg",
    "type":"icon"
  },
  {
    "filename":"bear5.svg",
    "trueUrl":"assets/bear5.svg",
    "type":"icon"
  },
  {
    "filename":"bear6.svg",
    "trueUrl":"assets/bear6.svg",
    "type":"icon"
  },
  {
    "filename":"bear7.svg",
    "trueUrl":"assets/bear7.svg",
    "type":"icon"
  },
  {
    "filename":"bear8.svg",
    "trueUrl":"assets/bear8.svg",
    "type":"icon"
  },
  {
    "filename":"bear9.svg",
    "trueUrl":"assets/bear9.svg",
    "type":"icon"
  },
  {
    "filename":"bear10.svg",
    "trueUrl":"assets/bear10.svg",
    "type":"icon"
  },
  {
    "filename":"bear11.svg",
    "trueUrl":"assets/bear11.svg",
    "type":"icon"
  },
  {
    "filename":"bear12.svg",
    "trueUrl":"assets/bear12.svg",
    "type":"icon"
  },
  {
    "filename":"bear13.svg",
    "trueUrl":"assets/bear13.svg",
    "type":"icon"
  },
  {
    "filename":"bear14.svg",
    "trueUrl":"assets/bear14.svg",
    "type":"icon"
  },
  {
    "filename":"bear15.svg",
    "trueUrl":"assets/bear15.svg",
    "type":"icon"
  },
  {
    "filename":"bear16.svg",
    "trueUrl":"assets/bear16.svg",
    "type":"icon"
  },
  {
    "filename":"bear17.svg",
    "trueUrl":"assets/bear17.svg",
    "type":"icon"
  },
  {
    "filename":"bear18.svg",
    "trueUrl":"assets/bear18.svg",
    "type":"icon"
  },
  {
    "filename":"bear19.svg",
    "trueUrl":"assets/bear19.svg",
    "type":"icon"
  },
  {
    "filename":"bear20.svg",
    "trueUrl":"assets/bear20.svg",
    "type":"icon"
  },
  {
    "filename":"bear21.svg",
    "trueUrl":"assets/bear21.svg",
    "type":"icon"
  },
  {
    "filename":"bull.svg",
    "trueUrl":"assets/bull.svg",
    "type":"icon"
  },
  {
    "filename":"bull2.svg",
    "trueUrl":"assets/bull2.svg",
    "type":"icon"
  },
  {
    "filename":"bull3.svg",
    "trueUrl":"assets/bull3.svg",
    "type":"icon"
  },
  {
    "filename":"bull4.svg",
    "trueUrl":"assets/bull4.svg",
    "type":"icon"
  },
  {
    "filename":"bull5.svg",
    "trueUrl":"assets/bull5.svg",
    "type":"icon"
  },
  {
    "filename":"bull6.svg",
    "trueUrl":"assets/bull6.svg",
    "type":"icon"
  },
  {
    "filename":"bull7.svg",
    "trueUrl":"assets/bull7.svg",
    "type":"icon"
  },
  {
    "filename":"bull8.svg",
    "trueUrl":"assets/bull8.svg",
    "type":"icon"
  },
  {
    "filename":"bull9.svg",
    "trueUrl":"assets/bull9.svg",
    "type":"icon"
  },
  {
    "filename":"bull10.svg",
    "trueUrl":"assets/bull10.svg",
    "type":"icon"
  },
  {
    "filename":"bull11.svg",
    "trueUrl":"assets/bull11.svg",
    "type":"icon"
  },
  {
    "filename":"bull12.svg",
    "trueUrl":"assets/bull12.svg",
    "type":"icon"
  },
  {
    "filename":"bull13.svg",
    "trueUrl":"assets/bull13.svg",
    "type":"icon"
  },
  {
    "filename":"bull14.svg",
    "trueUrl":"assets/bull14.svg",
    "type":"icon"
  },
  {
    "filename":"deer.svg",
    "trueUrl":"assets/deer.svg",
    "type":"icon"
  },
  {
    "filename":"deer2.svg",
    "trueUrl":"assets/deer2.svg",
    "type":"icon"
  },
  {
    "filename":"deer3.svg",
    "trueUrl":"assets/deer3.svg",
    "type":"icon"
  },
  {
    "filename":"deer4.svg",
    "trueUrl":"assets/deer4.svg",
    "type":"icon"
  },
  {
    "filename":"deer5.svg",
    "trueUrl":"assets/deer5.svg",
    "type":"icon"
  },
  {
    "filename":"deer6.svg",
    "trueUrl":"assets/deer6.svg",
    "type":"icon"
  },
  {
    "filename":"deer7.svg",
    "trueUrl":"assets/deer7.svg",
    "type":"icon"
  },
  {
    "filename":"deer8.svg",
    "trueUrl":"assets/deer8.svg",
    "type":"icon"
  },
  {
    "filename":"deer9.svg",
    "trueUrl":"assets/deer9.svg",
    "type":"icon"
  },
  {
    "filename":"deer10.svg",
    "trueUrl":"assets/deer10.svg",
    "type":"icon"
  },
  {
    "filename":"deer11.svg",
    "trueUrl":"assets/deer11.svg",
    "type":"icon"
  },
  {
    "filename":"deer12.svg",
    "trueUrl":"assets/deer12.svg",
    "type":"icon"
  },
  {
    "filename":"deer13.svg",
    "trueUrl":"assets/deer13.svg",
    "type":"icon"
  },
  {
    "filename":"deer14.svg",
    "trueUrl":"assets/deer14.svg",
    "type":"icon"
  },
  {
    "filename":"deer15.svg",
    "trueUrl":"assets/deer15.svg",
    "type":"icon"
  },
  {
    "filename":"deer16.svg",
    "trueUrl":"assets/deer16.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis.svg",
    "trueUrl":"assets/fleurdelis.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis2.svg",
    "trueUrl":"assets/fleurdelis2.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis3.svg",
    "trueUrl":"assets/fleurdelis3.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis4.svg",
    "trueUrl":"assets/fleurdelis4.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis5.svg",
    "trueUrl":"assets/fleurdelis5.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis6.svg",
    "trueUrl":"assets/fleurdelis6.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis7.svg",
    "trueUrl":"assets/fleurdelis7.svg",
    "type":"icon"
  },
  {
    "filename":"fleurdelis8.svg",
    "trueUrl":"assets/fleurdelis8.svg",
    "type":"icon"
  },
  {
    "filename":"fitness.svg",
    "trueUrl":"assets/fitness.svg",
    "type":"icon"
  },
  {
    "filename":"fitness2.svg",
    "trueUrl":"assets/fitness2.svg",
    "type":"icon"
  },
  {
    "filename":"fitness3.svg",
    "trueUrl":"assets/fitness3.svg",
    "type":"icon"
  },
  {
    "filename":"fitness4.svg",
    "trueUrl":"assets/fitness4.svg",
    "type":"icon"
  },
  {
    "filename":"fitness5.svg",
    "trueUrl":"assets/fitness5.svg",
    "type":"icon"
  },
  {
    "filename":"fitness6.svg",
    "trueUrl":"assets/fitness6.svg",
    "type":"icon"
  },
  {
    "filename":"fitness7.svg",
    "trueUrl":"assets/fitness7.svg",
    "type":"icon"
  },
  {
    "filename":"fitness8.svg",
    "trueUrl":"assets/fitness8.svg",
    "type":"icon"
  },
  {
    "filename":"fitness9.svg",
    "trueUrl":"assets/fitness9.svg",
    "type":"icon"
  },
  {
    "filename":"fitness10.svg",
    "trueUrl":"assets/fitness10.svg",
    "type":"icon"
  },
  {
    "filename":"fitness11.svg",
    "trueUrl":"assets/fitness11.svg",
    "type":"icon"
  }



];

   // Image.collection.remove({}, function(err) {
   //      console.log('collection removed')
   //      }); 

   // Image.collection.insertMany(data, function(err,r) {
   //  assert.equal(null, err);
   //  assert.equal(174, r.insertedCount);
   // });

module.exports = Image;