angular.module('starter.controllers', ['sync'])

.controller('SyncCtrl', function($scope, $ionicHistory, syncer) {

})

.controller('SubmitCtrl', function($scope, syncer) {
	$scope.doSubmit = syncer.submit;
	$scope.teamdata = {
		teamname: "",
		teamnumber: "",
		high: false,
		low: false,
		tower: false,
		portcullis: false,
		cheval: false,
		ramparts: false,
		moat: false,
		drawbridge: false,
		sally: false,
		rock: false,
		rough: false,
		terrain: false,
		type: "Neutral",
		auto: "",
		testing: "",
		match: ""
	}
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
