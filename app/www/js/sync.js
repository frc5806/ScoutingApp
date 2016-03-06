// Syncing function: populate local storage with database information
angular.module('sync', ['ionic', 'ionic.utils'])

.service('syncer', ['$localstorage', function($localstorage) {
	// do stuff
	this.syncLocal = function () {
		// This is the function to sync with local storage (use for database while offline)

		var data = $localstorage.getObject('data');
		console.log(data);
		return data;
	}

	this.submit = function (formData) {
		// This is the function to load data into local storage
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
