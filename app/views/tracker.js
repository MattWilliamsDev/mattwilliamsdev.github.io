'use strict';

angular.module( 'QualityABTracker.tracker', [ 'ngRoute', 'QualityABTracker.controllers' ] )

.config([ '$routeProvider', function( $routeProvider ) {
	$routeProvider

	.when( '/tracker', {
		templateUrl: 'templates/tracker.html'
		, controller: 'trackerCtrl'
	})
	.when( '/tracker/:player', {
		templateUrl: 'templates/tracker.html'
		, controller: 'trackerCtrl'
	})
}]);