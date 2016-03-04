// Syncing function: populate local storage with database information
angular.module('sync', ['ionic', 'ionic.utils'])

.service('syncer', ['$localstorage', function($localstorage) {
	// do stuff
	this.sync = function () {
		// This is the function
		$localstorage.set('name', 'Max');
		console.log($localstorage.get('name'));
		$localstorage.setObject('post', {
			name: 'Thoughts',
			text: 'Today was a good day'
		});

		var post = $localstorage.getObject('post');
		console.log(post);
		console.log("Syncing");
		return 0;
	}

	this.submit = function (data) {
		// This is the function
		console.log(data);
		var post = $localstorage.getObject('data') || [];
		if (data.high === "undefined") {
			data.high = false;
		}
		post.push(data);
		$localstorage.setObject('data', post);
		var final = $localstorage.getObject('data');
		console.log(final);
		console.log("Syncing");
		return 0;
	}
}]);
