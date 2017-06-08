angular.module('app.example', [
	'dp.fabric-angular',
	'common.fabric.constants'
])
.controller('ExampleCtrl', ['$scope', 'Fabric', 'dataService', 'FabricConstants', function(
	$scope,
	Fabric,
	dataService,
	FabricConstants
){

	$scope.fabric = {};
	$scope.FabricConstants = FabricConstants;
    //
	// $scope.setCanvasSize = function() {
	// 	$scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
	// 	$scope.fabric.setDirty(true);
	// 	delete $scope.canvasCopy;
	// };

	//
	// Init
	// ================================================================
	$scope.init = function() {


    FabricConstants.slide = {
      width: 600,
      height: 780,
      objects: [
      {
        type: "i-text",
        fontSize: 40,
        left: 300,
        textAlign: "center",
        top: 270,
        width: 500,
        height: 45,
        text: dataService.chosenLastName || "John Smith"
      },
        {
        type: "image",
        src: dataService.chosenImage || "assets/blue-lion-open-mouth.png",
        left: 300,
        top: 50,
        height: 300
      }, {
        type: "textbox",
        originX: "center",
        width: 500,
        height: 200,
        fontSize: 20,
        left: 300,
        top: 350,
        text: dataService.mainBeliefsString || "Life isn't worth living unless it is lived for someone else.\nIf someone loves you and hurts you, chances are they're in pain, too.\nYou are neither your thoughts nor your emotions. Only the sad are slaves to them.\nPray every morning.\nThe world turns aside to let any man pass who knows where he is going.\nThe best way to predict the future is to create it.\nThe past cannot be changed. The future iswithin your power."
      }
    ]
    };

		$scope.app = fiera.app(FabricConstants);


	};

  $scope.init();

	//$scope.$on('canvas:created', $scope.init);

	//tood
  /*
	Keypress.onSave(function() {
		$scope.updatePage();
	});
*/
}]);
