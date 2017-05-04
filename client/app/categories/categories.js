angular.module('app.categories', ['app.checklist-model'])

.service('dataService', function () {
  this.threeChoices = [];
  this.primary = [];
  this.sevenBeliefs = [];
  this.mainBeliefs = [];
  this.userCategories = [];
  this.tempSeven = [];
})

.controller('categoriesController', function($scope, $location, dataService, Categories, Auth) {
  $scope.data;
// $scope is the intermediary between what the user sees and the
// factory. $scope methods grab from the factory and display it
// via html

  $scope.sevenBeliefs = dataService.sevenBeliefs;
  $scope.threeChoices = dataService.threeChoices;
  $scope.primary = dataService.primary;
  $scope.mainBeliefs = dataService.mainBeliefs;
  $scope.userCategories = dataService.userCategories;

  $scope.workable = [];

  $scope.tempSeven = dataService.tempSeven;

  $scope.getAll = function() {
    Categories.getCategories().then(function(data){
      // console.log("Scope.getAll: ", data);
      $scope.data = data;
      for(var i = 0; i < data.length; i ++){
        $scope.workable.push(data[i].name);
      }
      for(var i = 0; i < $scope.workable.length; i ++) {
        $scope.obj[$scope.workable[i]] = data[i].beliefs;
      }
    }).catch(function(err) {
      console.log(err);
    })
  };

  $scope.addUserCategories = function(category) {
    console.log("this is the user category added ", category)
    Auth.addUserCategories(category).then(function(success) {
      console.log(success)
    }).catch(function(err) {
      console.log(err);
    })
  };

  $scope.toggleCatInListOfThree = function(index){
    console.log("reaching addCatToListOfThree");
    console.log("index: ", index);
    $scope.threeChoices.push(categories[index]);


  };

  $scope.getAll();
  $scope.obj = {};

  $scope.beliefDiv7 = true;
  $scope.beliefDiv8 = true;
  $scope.beliefDiv9 = true;

  $scope.addBeliefsToUser = function(beliefsArray) {
    Auth.addBeliefsToUser(beliefsArray);
  }

  $scope.addBeliefToUser = function(beliefString) {
    Auth.addBeliefToUser(beliefString);
  }

  $scope.grabResponseAndShowQuestionTwo = function() {
    $location.path('/finalthree');
  }

  $scope.getRandomBelief = function(itemId) {
    if(itemId <= 2){
      var newbie = Categories.getRandomBelief($scope.threeChoices[0], itemId)
      .then(function(data) {
        $scope.mainBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };
    if(itemId === 3 || itemId === 4) {
      var newbie = Categories.getRandomBelief($scope.threeChoices[1], itemId)
      .then(function(data) {
        $scope.mainBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };
    if(itemId === 5 || itemId === 6) {
      var newbie = Categories.getRandomBelief($scope.threeChoices[2], itemId)
      .then(function(data) {
        $scope.mainBeliefs[itemId] = data;
      }).catch(function(err) {
        console.log(err);
      })
    };

    return newbie;
  }

  $scope.updateAddedBelief = function(index, updatedBelief) {
    $scope.mainBeliefs[index] = updatedBelief;
    Auth.updateAddedBelief(index, updatedBelief)
      .then(function(success) {
        $scope.updatedBelief = null;
        console.log(success);
      }).catch(function(err) {
        console.log(err);
    })
  }

  $scope.deleteMainBelief = function(index) {
    var belief = $scope.mainBeliefs.splice(index, 1)[0];
    Auth.deleteMainBelief(belief)
      .then(function(success) {
        console.log("Belief deleted", success);
      }).catch(function(err) {
      console.log(err);
    })
  }

  $scope.grabResponseAndShowBeliefs = function() {
    $location.path('/chosenseven');
    var index = $scope.threeChoices.indexOf($scope.primary[0]);
    $scope.threeChoices.unshift(($scope.threeChoices.splice(index, 1))[0]);

    while ($scope.mainBeliefs.length < 3) {
      var arr = $scope.obj[$scope.threeChoices[0]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      $scope.tempSeven.push($scope.threeChoices[0]);
      if(!$scope.mainBeliefs.includes(temp)) {
        $scope.mainBeliefs.push(temp);
      }
    }
    while ($scope.mainBeliefs.length < 5) {
      var arr = $scope.obj[$scope.threeChoices[1]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      $scope.tempSeven.push($scope.threeChoices[1]);
      if(!$scope.mainBeliefs.includes(temp)) {
        $scope.mainBeliefs.push(temp);
      }
    }
    while ($scope.mainBeliefs.length < 7) {
      var arr = $scope.obj[$scope.threeChoices[2]];
      var temp = arr[Math.floor(Math.random()*arr.length)];
      $scope.tempSeven.push($scope.threeChoices[2]);
      if(!$scope.mainBeliefs.includes(temp)) {
        console.log($scope.mainBeliefs)
        $scope.mainBeliefs.push(temp);
      }
    }

    $scope.mainBeliefs.forEach(function(belief, index){
      $scope.beliefText += (index + 1) + ".  " + belief + "\r\n";
    });

    $scope.addBeliefsToUser($scope.mainBeliefs);
  };

  $scope.beliefText = '';

  $scope.grabResponseAndAddToSevenBeliefs = function() {
    $scope.mainBeliefs.push($scope.addedBelief);
    $scope.addBeliefToUser($scope.addedBelief);
    $scope.addedBelief = null;
  };

  $scope.removeCategory = function(list, item) {
    if(list.indexOf(item) !== -1) {
      var answer = list.splice(list.indexOf(item), 1);
      Categories.removeCategory(item);
    }
  }

  $scope.makeImage = function() {
    $location.path('/create');
  }

  $scope.myCanvas = function() {

  // $location.path('/fabric');

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var img = document.getElementById("scream");
    // console.log(img.src);
    ctx.drawImage(img,120,50);

    ctx.font = "15px Arial";
    ctx.fillText($scope.sevenBeliefs[0],110,370,280);
    ctx.fillText($scope.sevenBeliefs[1],110,390,280);
    ctx.fillText($scope.sevenBeliefs[2],110,410,280);
    ctx.fillText($scope.sevenBeliefs[3],110,430,280);
    ctx.fillText($scope.sevenBeliefs[4],110,450,280);
    ctx.fillText($scope.sevenBeliefs[5],110,470,280);
    ctx.fillText($scope.sevenBeliefs[6],110,490,280);
    // if($scope.sevenBeliefs[7]){
    ctx.fillText($scope.sevenBeliefs[7],110,510,280);
    // }
      // ctx.fillText($scope.sevenBeliefs[8],110,530,280);

  }

})