var app = angular.module('app', []);
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
   $scope.dog = {};
   $scope.dogs = [];
   var fetchDogs = function() {
       return $http.get('/dogs').then(function(response){
           if(response.status !== 200){
               throw new Error('Failed to fetch dogs from the API');
           }
           $scope.dog = {};
           $scope.dogs = response.data;
           return response.data;
       });
   };
   $scope.add = function(dog){
       return $http.post('/add', dog).then(fetchDogs());
   };
   fetchDogs();
}]);
