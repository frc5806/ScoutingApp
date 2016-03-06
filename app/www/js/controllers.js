angular.module('starter.controllers', ['sync'])

.controller('SyncCtrl', function($scope, $ionicHistory, syncer) {

})

.controller('SubmitCtrl', function($scope, syncer) {
	$scope.doSubmit = syncer.submit;
})

.controller('DataCtrl', function($scope, syncer) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.datas=syncer.syncLocal();
		// fill in and stuff
	});
})

.controller('TeamCtrl', function($scope, $stateParams, syncer) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.data=syncer.getTeam($stateParams.teamNum);
		console.log($scope.data)
	});
});
