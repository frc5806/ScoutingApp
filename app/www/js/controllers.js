angular.module('starter.controllers', ['sync'])

.controller('SyncCtrl', function($scope, $ionicHistory, syncer) {

})

.controller('SubmitCtrl', function($scope, syncer) {
	$scope.doSubmit = syncer.submit;
})

.controller('DataCtrl', function($scope, Chats, syncer) {
	
});
