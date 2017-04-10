var app = angular.module("myApp", ["ngRoute"]);

app.controller('loginController',['$scope','$rootScope','$http','$location',function($scope,$rootScope,$http,$location){
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
app.controller('mainController',['$scope','$http','$location',function($scope,$http,$location){
    $scope = {};
}]);
app.controller('registerController',['$scope','$http','$location',function($scope,$http,$location){
    $scope.registerData = {};
    $scope.register = function(){
        $http.post('/register', $scope.registerData).then(function(data){
            $location.path('/login');
        }, function(err){
            console.log(err);
        });
    };
}]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/login", {
        templateUrl : "login/login.html",
        controller : 'loginController'
    })
    .when("/register", {
        templateUrl : "register/register.html"
    })
    .otherwise("/", {
        templateUrl : "main.html"
    });
});