var myApp = angular.module('myApp', []);
myApp.fn = {};
myApp.controller('QZCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.StartCtrl = {
			run: function() {
				restService.Aget($http, "/quarters/qz", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.StartCtrl.run;
		myApp.fn.StartCtrl.run();
	}
])