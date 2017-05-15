angular.module('common.fabric.window', ['common.fabric.canvas'])

.factory('FabricWindow', ['$window', function($window) {
   
	return { Canvas : $window.fabric};

}]);
