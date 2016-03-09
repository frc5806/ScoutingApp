angular.module('ScoutingApp.controllers', ['ionic', 'ngCordovaBluetoothLE'])

.controller('SyncCtrl', function($scope, $ionicPlatform, $cordovaBluetoothLE) {
	$scope.sync = function() {
		console.log("Started scan");
		$ionicPlatform.ready(function() {
			$cordovaBluetoothLE.initialize({request:true}).then(null, function(err) {
					console.log("Init error");
					console.log(JSON.stringify(err));
				}, function(success) {
					console.log("Init success");
					console.log(JSON.stringify(success));

					$cordovaBluetoothLE.stopScan();

					var devices = [];
					$cordovaBluetoothLE.startScan({services:null}).then(null, function(err) {
						console.log(JSON.stringify(err));
					}, function(result) {
						if(result.status == "scanResult") {
							if(devices.filter(function(d) { return result.address == d.address; }).length == 0) {
								console.log(JSON.stringify(result));
								devices.push(result);
							}
						}
					});
				}
			);
		});
	};

	$scope.sync();
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
		$scope.datas = $localStorage.getForms();
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
		$scope.data = $localStorage.getForm($stateParams.teamNum);
		console.log($scope.data);
	});
});
