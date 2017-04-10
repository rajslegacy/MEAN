var app = angular.module("myApp", [
    "ngRoute",
    'myApp.login',
    'myApp.register',
    'myApp.tetris'
    ]);

app.controller('mainController',['$scope','$http','$location',function($scope,$http,$location){
    $scope = {};
}]);
app.controller('gamesController',['$scope','$http','$location',function($scope,$http,$location){
    $scope.gamelist = [];
    $scope.getList = function(){
        $http.get('/games/list').then(function(response){
            $scope.gamelist = response.data;
        }, function(err){
            console.log(err);
        });
    };
    $scope.getList();
}]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when('/games',{
        templateUrl : 'games/games.html'
    })
    .otherwise({redirectTo: '/'});
});