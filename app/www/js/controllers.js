angular.module('ScoutingApp.controllers', [])

.controller('SyncCtrl', function($scope, $ionicHistory) {

})

.controller('SubmitCtrl', function($scope, $state, $ionicPopup, $localStorage) {
	function startingTeamData() {
		return {
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
		};
	};
	console.log($localStorage.getForms());
	$scope.doSubmit = function(form) {
		try {
			console.log(form);
			$localStorage.addForm(form);
			$scope.teamData = startingTeamData();
		} catch (err) {
			console.log(err);
			$ionicPopup.alert({
				title: 'Incomplete Form',
				template: 'Fill in at least team name and number'
			});
		}
	};

	$scope.teamData = startingTeamData();
})

.controller('DataCtrl', function($scope, $state, $ionicPopup, $localStorage) {
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
	};

	$scope.$on('$ionicView.enter', function(e) {
		$scope.datas = form
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

.controller('TeamCtrl', function($scope, $stateParams, $localStorage) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.data=syncer.getTeam($stateParams.teamNum);
		console.log($scope.data);
	});
});
