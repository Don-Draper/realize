angular.module('app.example', [
	'common.fabric',
	'common.fabric.utilities',
	'common.fabric.constants'
])

.controller('ExampleCtrl', ['$scope', 'Fabric', 'dataService', 'FabricConstants', 'Keypress', function(
	$scope, 
	Fabric, 
	dataService, 
	FabricConstants, 
	Keypress

	) {

	$scope.fabric = {};
	$scope.FabricConstants = FabricConstants;

	//
	// Creating Canvas Objects
	// ================================================================
	$scope.addShape = function(path) {
		$scope.fabric.addShape('http://fabricjs.com/assets/15.svg');
	};

	$scope.addImage = function(image) {
		$scope.fabric.addImage(dataService.chosenImage);
	};

	$scope.addText = function() {
		$scope.fabric.addText(dataService.mainBeliefsString);
	}

	$scope.addImageUpload = function(data) {
		var obj = angular.fromJson(data);
		$scope.addImage(obj.filename);
	};

	//
	// Editing Canvas Size
	// ================================================================
	$scope.selectCanvas = function() {
		$scope.canvasCopy = {
			width: $scope.fabric.canvasOriginalWidth,
			height: $scope.fabric.canvasOriginalHeight
		};
	};

	$scope.setCanvasSize = function() {
		$scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
		$scope.fabric.setDirty(true);
		delete $scope.canvasCopy;
	};

	//
	// Init
	// ================================================================
	$scope.init = function() {
		$scope.fabric = new Fabric({
			JSONExportProperties: FabricConstants.JSONExportProperties,
			textDefaults: FabricConstants.textDefaults,
			lastNameDefaults: FabricConstants.lastNameDefaults,
			itextDefaults: FabricConstants.itextDefaults,
			shapeDefaults: FabricConstants.shapeDefaults,
			json: {}
		});
		$scope.fabric.setFormat(dataService.chosenImage, dataService.mainBeliefsString, dataService.lastName);		
	};

	$scope.$on('canvas:created', $scope.init);

	Keypress.onSave(function() {
		$scope.updatePage();
	});

}]);