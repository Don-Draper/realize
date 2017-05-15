angular.module('app', [
  'app.factory',
  'app.auth',
  'app.categories',
  'ngMaterial',
  'app.images',
  'app.example',
  // 'app.common.fabric',
  // 'app.common.fabric.utilities',
  // 'app.common.fabric.constants',
  //'app.modalService',
  'ngRoute'

  ])  

.service('dataService', function () {
  this.threeChoices = [];
  this.primary = [];
  this.sevenBeliefs = [];
  this.mainBeliefs = [];
  this.userCategories = [];
  this.tempSeven = [];
  this.urls = [];
  this.mainBeliefsString = '';
  this.changeMainBeliefsFromArrayToString = function() {
    var final = '';
    for(var i = 0; i < this.mainBeliefs.length; i ++) {
      final += `${i+1}.  ${this.mainBeliefs[i]}\n`;
    }
    this.mainBeliefsString = final;
  };
  this.lastName = '';
  this.chosenImage = '';
  this.sevenForFabric = [];

})

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '400',
      'hue-1' : '100',
      'hue-2' : '600',
      'hue-3' : 'A100'
    })
    .accentPalette('amber')
    .warnPalette('red')
    .backgroundPalette('grey');
})

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: './app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: './app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/facebook', {
      templateUrl: './app/auth/facebook.html',
      controller: 'AuthController'
    })
    .when('/signout', {
      templateUrl: './app/auth/signout.html',
      controller: 'AuthController'
    })
    .when('/deleteUser', {
      templateUrl: './app/auth/deleteUser.html',
      controller: 'AuthController'
    })
    .when('/', {
      templateUrl: './app/categories/main.html',
      controller: 'categoriesController'
      // controller: 'AuthController'
      //controller: 'modalController'
    })
    .when('/firstseven', {
      templateUrl: './app/categories/firstseven.html',
      controller: 'categoriesController'
    })
    .when('/finalthree', {
      templateUrl: './app/categories/finalthree.html',
      controller: 'categoriesController'
    })
    .when('/chosenseven', {
      templateUrl: './app/categories/chosenseven.html',
      controller: 'categoriesController'
    })
    .when('/create', {
      templateUrl: './app/categories/create.html',
      controller: 'categoriesController'
    })
    .when('/icons', {
      templateUrl: './app/categories/icons.html',
      controller: 'categoriesController'     
    })
    .when('/homebase', {
      templateUrl: './app/categories/homebase.html',
      controller: 'categoriesController'    
    })
    // .when('/images', {
    //   templateUrl: './app/canvas/canvas.html',
    //   controller: 'imagesController'
    // })
    .when('/images', {
      templateUrl: './app/images/images.html',
      controller: 'imagesController'
    })
    .when('/gallery', {
      templateUrl: './app/images/gallery.html',
      controller: 'imagesController'
    })
    .when('/demo', {
      templateUrl: './app/categories/Demo.html',
      controller: 'ExampleCtrl'
    })
    .when('/fabric', {
      templateUrl: './app/fabric/fabric.html',
      controller: 'ExampleCtrl'
    })
    .otherwise({
      redirectTo: '/signin'
    });

    $httpProvider.interceptors.push('AttachTokens');
})
// We add our $httpInterceptor into the array
// of interceptors. Think of it like middleware for your ajax calls
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.createaculture');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here we look at the token in localstorage to see if the user exists by 
  // sending to the server for validation
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});