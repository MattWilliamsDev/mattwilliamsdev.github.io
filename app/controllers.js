'use strict';

angular.module( 'QualityABTracker.controllers', [] )

.controller( 'trackerCtrl', function( $scope, $routeParams ) {
	// var fetchParams = {};

	if ( !!localStorage.getItem( 'players' ) ) {
		$scope.players = angular.fromJson( localStorage.getItem( 'players' ) );
	} else {
		$scope.players = [
			{
				id: 0
				, lastName: 'Bishop'
				, firstName: 'Drew'
				, number: 34
				, points: 0
			}
			, {
				id: 1
				, lastName: 'Carlisle'
				, firstName: 'Kamau'
				, number: 10
				, points: 0
			}
			, {
				id: 2
				, lastName: 'Faubion'
				, firstName: 'CJ'
				, number: 27
				, points: 0
			}
			, {
				id: 3
				, lastName: 'Fulton'
				, firstName: 'Sam'
				, number: 44
				, points: 0
			}
			, {
				id: 4
				, lastName: 'Hegeduis'
				, firstName: 'Miles'
				, number: 8
				, points: 0
			}
			, {
				id: 5
				, lastName: 'Klayer'
				, firstName: 'Kris'
				, number: 3
				, points: 0
			}
			, {
				id: 6
				, lastName: 'Long'
				, firstName: 'Eric'
				, number: 23
				, points: 0
			}
			, {
				id: 7
				, lastName: 'Poynter'
				, firstName: 'AJ'
				, number: 17
				, points: 0
			}
			, {
				id: 8
				, lastName: 'Rosko'
				, firstName: 'Jake'
				, number: 12
				, points: 0
			}
			, {
				id: 9
				, lastName: 'Tuinei'
				, firstName: 'Zach'
				, number: 13
				, points: 0
			}
			, {
				id: 10
				, lastName: 'Vogt'
				, firstName: 'Zach'
				, number: 30
				, points: 0
			}
			, {
				id: 11
				, lastName: 'Williams'
				, firstName: 'Cooper'
				, number: 32
				, points: 0
			}
			, {
				id: 12
				, lastName: 'Wilson'
				, firstName: 'Chris'
				, number: 42
				, points: 0
			}
		];
	}

	$scope.sortColumn = 'lastName';

	$scope.sort = function( property ) {
		$scope.sortColumn = property;
		$scope.players = _.sortBy( $scope.players, function( player ) {
			return player[ property ];
		});
	};

	$scope.addPoints = function( number, player ) {
		player.points += number;
		$scope.save();
	};

	$scope.resetPoints = function( player ) {
		player.points = 0;
		$scope.save();
	};

	$scope.resetAllPoints = $scope.resetAll = function() {
		angular.forEach( $scope.players, function( player ) {
			player.points = 0;
		});
		$scope.save();
	};

	$scope.totalPoints = function() {
		var total = 0;
		angular.forEach( $scope.players, function( player ) {
			total += player.points;
		});
		return total;
	};

	$scope.save = function() {
		localStorage.setItem( 'players', angular.toJson( $scope.players ) );
	};
});