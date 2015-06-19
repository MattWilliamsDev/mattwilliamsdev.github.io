'use strict';

// Declare app level module which depends on views, and components
angular.module( 'QualityABTracker', [
	'ngRoute'
	, 'QualityABTracker.tracker'
])

.config([ '$routeProvider', function( $routeProvider ) {
	$routeProvider.otherwise({
		redirectTo: '/tracker'
	});
}]);
