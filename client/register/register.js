'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/register", {
        templateUrl : "register/register.html"
    })
}])
.controller('registerController',['$scope','$http','$location',function($scope,$http,$location){
    $scope.registerData = {};
    $scope.register = function(){
        $http.post('/register', $scope.registerData).then(function(data){
            $location.path('/login');
        }, function(err){
            console.log(err);
        });
    };
}]);