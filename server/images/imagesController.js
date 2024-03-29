var Image = require('./imagesModel.js');
var db = require('../../index.js');
var Q = require('q');

var findImage = Q.nbind(Image.findOne, Image);
var createImage = Q.nbind(Image.create, Image);
var findAllImages = Q.nbind(Image.find, Image);
var findOneAndChange = Q.nbind(Image.findOneAndUpdate, Image);

module.exports = {

  getAllImages: function(req, res, next) {
    findAllImages({})
    .then(function (images) {
        res.json(images);
      })
      .fail(function (error) {
        next(error);
      });
  }

  // getGalleryImages: function(req, res, next) {
  //   findAllImages({})
  //   .then(function (images) {
  //       res.json(images);
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // }

};