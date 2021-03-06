var API_URL = "http://104.131.162.47:5000/api/";

angular.module('ScoutingApp.controllers', ['ionic', 'ngCordova'])

.controller('SyncCtrl', function($scope, $ionicPlatform, $localStorage, $ionicPopup, $http) {

	function syncSucess() {
		$ionicPopup.alert({
			title: 'Done',
			template: 'Finished syncing.'
		});
	}

	function syncFail() {
		$ionicPopup.alert({
			title: 'Failure',
			template: 'Syncing failed. Are you connected to the internet?'
		});
	}

	var deploy = new Ionic.Deploy();

	// Update app code with new release from Ionic Deploy
	function doUpdate() {
		deploy.update().then(function(res) {
			console.log('Ionic Deploy: Update Success! ', res);
		}, function(err) {
			console.log('Ionic Deploy: Update error! ', err);
		}, function(prog) {
			console.log('Ionic Deploy: Progress... ', prog);
		});
	};

	$scope.sync = function() {
		console.log("Syncing");
		$ionicPlatform.ready(function() {
			$http({
				url: API_URL+"forms",
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				data: JSON.stringify({ 'forms': $localStorage.getForms() })
			}).then(function(response) {
				console.log("Sucess");
				$http.get(API_URL+"forms").then(function(response) {
					console.log("Sucess in get");
					response.data.forEach(function(form) {
						$localStorage.addForm(form);
					});

					syncSucess();
				}, function(response) {
					console.log("Error on get");
					console.log(JSON.stringify(response));
					syncFail();
				});
			}, function(response) {
				console.log("Error on post");
				console.log(JSON.stringify(response));
				syncFail();
			});
			$localStorage.getRankings(); // to update standings
			doUpdate();

		});
	};
})

.controller('SubmitCtrl', function($scope, $state, $ionicPopup, $localStorage, $stateParams) {
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
			lowBar: false,
			type: "Neutral",
			pos: "Middle",
			auto: "",
			testing: "",
			match: "",
			comments: ""
		};
	}
	console.log($localStorage.getForms());
	$scope.doSubmit = function(form) {
		try {
			console.log(form);
			if ($state.notDefault || $localStorage.getForm($scope.teamData.teamnumber)) {
				var confirmPopup = $ionicPopup.confirm({
					title: 'Overwrite?',
					template: 'This will overwrite an existing review.'
				});
				confirmPopup.then(function(res) {
					if(res) {
						$ionicPopup.alert({
							title: 'Overwritten',
							template: 'Database successfully emptied'
						});
						$localStorage.addForm(form);
					} else {
						$ionicPopup.alert({
							title: 'Not overwritten'
						});
					}
				});
			} else {
				$localStorage.addForm(form);
			}
			$scope.teamData = startingTeamData();
		} catch (err) {
			console.log(err);
			$ionicPopup.alert({
				title: 'Incomplete Form',
				template: 'Fill in at least team name and number'
			});
		}
	};

	$scope.$on('$ionicView.enter', function(e) {
		if ($state.is("tab.submitSomething")) {
			$scope.notDefault = true;
			$scope.teamData = $localStorage.getForm($stateParams.teamNum);
			console.log($scope.teamData);
		} else {
			$scope.notDefault = false;
			$scope.teamData = startingTeamData();
		}
	});
})

.controller('DataCtrl', function($scope, $state, $ionicPopup, $localStorage) {
	$scope.emptyStorage = function () {

		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure?',
			template: 'Are you ready to empty the database'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$localStorage.deleteForms();
				$scope.datas = $localStorage.getForms();
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
		$scope.datas = $localStorage.getForms();
		if ($scope.datas == -2) {
			$ionicPopup.alert({
				title: 'No database entries',
				template: 'Please submit at least one entry'
			});
			$state.transitionTo("tab.submit");
		}
	});
})

.controller('RankingCtrl', function($scope, $state, $ionicPopup, $localStorage) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.datas = $localStorage.getRankings();
		if ($scope.datas == -2) {
			$ionicPopup.alert({
				title: 'No database entries',
				template: 'Please submit at least one entry'
			});
			$state.transitionTo("tab.submit");
		}
	});
})

.controller('TeamCtrl', function($scope, $stateParams, $localStorage) {
	$scope.$on('$ionicView.enter', function(e) {
		$scope.data = $localStorage.getForm($stateParams.teamNum);
		console.log($scope.data);
	});
});
