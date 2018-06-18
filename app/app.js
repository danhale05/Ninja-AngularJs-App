const myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

// Routes for pages
myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    /* $locationProvider.html5Mode(true); */

    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'NinjaController'
        })
        .when('/contact', {
            templateUrl: '/views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: '/views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: '/views/directory.html',
            controller: 'NinjaController'
        }).otherwise({
            redirectTo: '/home'
        });

}]);

// Creating directive randomNinja
myNinjaApp.directive('randomNinja', [function() {

    return {
        // Restricts to E - elements
        restrict: 'E',
        // the '=' grabs data from the directive, random-ninja
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };

}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

    $scope.removeNinja = function(ninja) {
        // Var to remove ninja, indexOf gets a number for the next function
        const removeNinja = $scope.ninjas.indexOf(ninja);
        // Takes number from removeNinja above to update ninjas
        $scope.ninjas.splice(removeNinja, 1);
    };
    // Add a new ninja object
    $scope.addNinja = function() {
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true
        });
        // removes submitted info
        $scope.newninja.name = "";
        $scope.newninja.belt = "";
        $scope.newninja.rate = "";
    };
    // Remove all the ninjas
    $scope.removeAll = function() {
        $scope.ninjas = [];
    };
    // Use http to get data for ninjas
    $http.get('data/ninjas.json').then(function(response) {
        $scope.ninjas = response.data;
    });
    // Reset Ninjas
    $scope.resetNinjas = function() {
        $http.get('data/ninjas.json').then(function(response) {
            $scope.ninjas = response.data;
        })
    };

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {

    $scope.sendMessage = function() {
        $location.path('/contact-success');
    };
}]);