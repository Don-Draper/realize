angular.module('app.images', [])

.controller('imagesController', function($scope, Images, Categories, dataService) {

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
  $scope.mainBeliefsString = dataService.mainBeliefsString;
  $scope.lastName = dataService.lastName;

  $scope.chosenImage = '../assets/amflag-shield.svg';



  $scope.createCanvas = function() {
    var canvas = new fabric.Canvas('canvas');


    fabric.Image.fromURL($scope.chosenImage, function(oImg) {
      oImg.set({left: 135, top: 30});
      oImg.scale(0.75);
      canvas.add(oImg);
    });

    var text = new fabric.Textbox($scope.mainBeliefsString, {
      fontFamily: 'Comic Sans',
      fontSize: 18

    });

    text.set({left: 75, top: 270, width: 350});

    canvas.add(text);

    var lastName = new fabric.Text("Tanguis", {
      fontSize: 40
    });

    lastName.set({left: 190, top: 250});
    canvas.add(lastName);

  };

});