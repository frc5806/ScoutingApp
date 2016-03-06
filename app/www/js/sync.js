// Syncing function: populate local storage with database information
angular.module('sync', ['ionic', 'ionic.utils'])

.service('syncer', ['$localstorage', function($localstorage) {
	// do stuff
	this.syncLocal = function () {
		// This is the function to sync with local storage (use for database while offline)

		var data = $localstorage.getObject('data');
		console.log(data);
		return data.sort(function(a,b) {
			return a.teamnumber - b.teamnumber;
		});
	}

	this.getTeam = function (teamNum) { // from local storage
		var data = $localstorage.getObject('data');
		for (var i = 0; i < data.length; i++) {
			if (data[i].teamnumber == teamNum) {
				return data[i];
			}
		}
	}

	this.submit = function (formData) {
		// This is the function to load data into local storage
		if (formData.teamnumber == "" || formData.teamname == "") {
			return -2;
		}
		console.log(formData);
		var data = $localstorage.getObject('data'); // load from local storage
		console.log(data);
		if (JSON.stringify(data) === "{}") { // if localstorage is empty
			data = [formData];
		} else {
			data.push(formData); // push to localstorage array
		}
		$localstorage.setObject('data', data); // load into localstorage
		return 0;
	}
}]);
