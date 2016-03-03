angular.module('starter.controllers', ['sync'])

.controller('SyncCtrl', function($scope, $ionicHistory, syncer) {
	$scope.$on('$ionicView.enter', function(e) {
		syncer.sync()
		$ionicHistory.goBack(-1);
	});
})

.controller('SubmitCtrl', function($scope) {})

.controller('DataCtrl', function($scope, Chats, syncer) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	$scope.$on('$ionicView.enter', function(e) {
		syncer.sync()
		// fill in and stuff
	});
});
