angular.module('starter.services', [])

.factory('Chats', function() {

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
});

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
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
}]);
