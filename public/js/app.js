require('angular/angular');
require('angular-route/angular-route');

var stoneApp = angular.module('stoneApp', ['ngRoute']);

stoneApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');

		$routeProvider.when('/stone', {
			templateUrl: 'partials/card-list.html',
			controller: 'CardListCtrl',
		})

		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}]);

stoneApp.controller('CardListCtrl', function($scope) {
	$scope.info = 'Salut';
});
