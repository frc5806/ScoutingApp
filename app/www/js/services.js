angular.module('ScoutingApp.services', [])

.service('Chats', function() {

	// Some fake testing data
	var chats = [{
		id: 0,
		name: 'Ben Sparrow',
		lastText: 'You on your way?',
		face: 'img/ben.png'
	}, {
		id: 1,
		name: 'Max Lynx',
		lastText: 'Hey, it\'s me',
		face: 'img/max.png'
	}, {
		id: 2,
		name: 'Adam Bradleyson',
		lastText: 'I should buy a boat',
		face: 'img/adam.jpg'
	}, {
		id: 3,
		name: 'Perry Governor',
		lastText: 'Look at my mukluks!',
		face: 'img/perry.png'
	}, {
		id: 4,
		name: 'Mike Harrington',
		lastText: 'This is wicked good ice cream.',
		face: 'img/mike.png'
	}];

	return {
		all: function() {
			return chats;
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function(chatId) {
			for (var i = 0; i < chats.length; i++) {
				if (chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
})

.service('$localstorage', function($window) {
	var FORM_KEY = "forms";

	var set = function(key, value) {
		$window.localStorage[key] = JSON.stringify(value);
	};
	var get = function(key, defaultValue) {
		return JSON.parse($window.localStorage[key] || defaultValue);
	};
	return {
		getForms: function() {
			return get(FORM_KEY, '[]');
		},
		addForm: function(form) {
			var forms = this.getForms();
			forms.append(form);
			set(FORM_KEY, forms);
		}
	};
})

// Syncing function: populate local storage with database information
.service('syncer', function($localstorage) {
	// do stuff
	this.syncLocal = function () {
		// This is the function to sync with local storage (use for database while offline)

		var data = $localstorage.getObject('data');
		console.log(data);
		if (JSON.stringify(data) == "{}") {
			return -2;
		}
		return data.sort(function(a,b) {
			return a.teamnumber - b.teamnumber;
		});
	};

	this.getTeam = function (teamNum) { // from local storage
		var data = $localstorage.getObject('data');
		for (var i = 0; i < data.length; i++) {
			if (data[i].teamnumber == teamNum) {
				return data[i];
			}
		}
	};

	this.submit = function (formData) {
		// This is the function to load data into local storage
		if (formData.teamnumber === "" || formData.teamname === "") {
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
	};

	this.emptyLocal = function () {
		$localstorage.setObject('data', {});
		console.log("Emptied");
		return 0;
	};


});
