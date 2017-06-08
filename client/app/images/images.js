angular.module('app.images', [])

.controller('imagesController', function($scope, $location, Images, dataService) {

  $scope.urls = dataService.urls;
  $scope.images = [];
  $scope.chosenImage = dataService.chosenImage;
  $scope.chosenLastName = dataService.chosenLastName;

  $scope.getAll = function() {
    Images.getImages().then(function(data){
      $scope.images = data;
      for(var i = 0; i < data.length; i ++){
        $scope.urls.push(data[i].trueUrl);
      }
    }).catch(function(err) {
      console.log(err);
    })
  };

  $scope.getGalleryImages = function() {
    Images.getImages().then(function(data){
      $scope.images = data;
      for(var i = 0; i < data.length; i ++){
        $scope.urls.push(data[i].trueUrl);
      }
    }).catch(function(err) {
      console.log(err);
    })
  }

  $scope.chooseImage = function(imageUrl) {
    dataService.chosenImage = imageUrl;
    $location.path('/demo');
    // console.log(imageUrl);

  }

  $scope.getAll();
  $scope.mainBeliefsString = dataService.mainBeliefsString;
  // $scope.chosenLastName = dataService.chosenLastName;

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

    var chosenLastName = new fabric.Text("Tanguis", {
      fontFamily: 'Limelight',
      fontSize: 85,
      // lockUniScaling: true,
      textAlign: 'left',
      centeredScaling: true
      // originY: 'center'
    });

    chosenLastName.set({top: 250, left: 100});
    // fabric.canvas.centerH(chosenLastName);
    canvas.add(chosenLastName);

    // var textAsset = new fabric.Text('Tanguis', {
    //             fontFamily: 'Playfair Display SC',
    //             fontSize: 100,
    //             lockUniScaling: true,
    //             textAlign: 'left',
    //             originX: 'left',
    //             originY: 'top',
    //             centeredRotation: true,
    //             centeredScaling: true
    // });
  function changeFont() {


    console.log("reached changefont");
      var activeObject = canvas.getActiveObject();
      activeObject.fontFamily = 'Gruppo';
      activeObject.setCoords();
                  
      canvas.renderAll();
      canvas.calcOffset();
  }


    // canvas.add(textAsset);
    // canvas.centerObject(textAsset);

    // textAsset.setCoords();

    // canvas.renderAll();
    // canvas.calcOffset();


  };



});