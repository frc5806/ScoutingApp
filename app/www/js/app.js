// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova', 'ScoutingApp.controllers', 'ScoutingApp.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	// for form inputs)
	if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);

	}
	if (window.StatusBar) {
		// org.apache.cordova.statusbar required
		StatusBar.styleDefault();
	}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.sync', {
		url: '/sync',
		views: {
			'tab-sync': {
				templateUrl: 'templates/sync.html',
				controller: 'SyncCtrl'
			}
		}
	})

	// Database stuff
	.state('tab.data', {
		url: '/data',
		views: {
			'tab-data': {
				templateUrl: 'templates/data.html',
				controller: 'DataCtrl'
			}
		}
	})

	.state('tab.team', {
		url: '/data/:teamNum',
		views: {
			'tab-data': {
				templateUrl: 'templates/team.html',
				controller: 'TeamCtrl'
			}
		}
	})

		.state('tab.submitSomething', {
			url: '/submit/:teamNum',
			views: {
				'tab-submit': {
					templateUrl: 'templates/submit.html',
					controller: 'SubmitCtrl'
				}
			}
		})

	.state('tab.submit', {
		url: '/submit',
		views: {
			'tab-submit': {
				templateUrl: 'templates/submit.html',
				controller: 'SubmitCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/submit');

});
