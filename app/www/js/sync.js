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
}]);
