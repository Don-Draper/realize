angular.module('app.images', [])

.controller('imagesController', function($scope, Images, dataService) {

  $scope.urls = dataService.urls;

  $scope.getAll = function() {
    console.log("reached scope.getAll");
    Images.getImages().then(function(data){
      console.log("Scope.urls: ", $scope.urls);
      if($scope.urls.length < 3){
        for(var i = 0; i < data.length; i ++){
          $scope.urls.push(data[i].trueUrl);
        }
      }
    }).catch(function(err) {
      console.log(err);
    })
  };

  $scope.getAll();

});