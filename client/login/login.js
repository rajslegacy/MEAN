'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/login", {
        templateUrl : "login/login.html",
        controller : 'loginController'
    })
}])
.controller('loginController',['$scope','$rootScope','$http','$location',function($scope,$rootScope,$http,$location){
    $scope.loginData = {};
    $scope.login = function(){
        $http.post('/login', $scope.loginData).then(function(response){
            $rootScope.user = response.data;
            $rootScope.isLoggegIn = true;
            $location.path('#');
        }, function(err){
            console.log(err);
            var $toastContent = $('<span>Username or password mismatch</span>');
            Materialize.toast($toastContent, 5000);
        });
    };
}]);