angular.module('starter.controllers', ['sync'])

.controller('SyncCtrl', function($scope, $ionicHistory, syncer) {

})

.controller('SubmitCtrl', function($scope, $state, $ionicPopup, syncer) {
	$scope.doSubmit = function(data) {
		if (syncer.submit(data) < 0) {
			$ionicPopup.alert({
				title: 'Incomplete Form',
				template: 'Fill in at least team name and number'
			});
		} else {
			$state.transitionTo("tab.data");
		}
	}
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

.controller('DataCtrl', function($scope, $state, $ionicPopup, syncer) {
	$scope.emptyStorage = function () {

		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			template: 'Are you ready to empty the database'
		});
		confirmPopup.then(function(res) {
			if(res) {
				syncer.emptyLocal();
				$state.transitionTo("tab.submit");
				$ionicPopup.alert({
					title: 'Database Emptied',
					template: 'Database successfully emptied'
				});
			} else {
				$ionicPopup.alert({
					title: 'Database Not Emptied',
					template: 'Database not emptied'
				});
			}
		});
	}

	$scope.$on('$ionicView.enter', function(e) {
		$scope.datas=syncer.syncLocal();
		if ($scope.datas == -2) {
			$ionicPopup.alert({
				title: 'No database entries',
				template: 'Please submit at least one entry'
			});
			$state.transitionTo("tab.submit");
		}
		// fill in and stuff
	});
})

.controller('TeamCtrl', function($scope, $stateParams, syncer) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.data=syncer.getTeam($stateParams.teamNum);
		console.log($scope.data)
	});
});
