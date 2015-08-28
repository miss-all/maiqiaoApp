var myApp = angular.module('myApp', []);
myApp.fn = {};
myApp.controller('StartCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.StartCtrl = {
			run: function() {
				restService.Aget($http, "/quarters/start", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.StartCtrl.run;

	}
]).controller('WorkCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.WorkCtrl = {
			run: function() {
				restService.Aget($http, "/quarters/work", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.WorkCtrl.run;
		myApp.fn.WorkCtrl.run();
	}
]).controller('EndCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.EndCtrl = {
			run: function() {
				restService.Aget($http, "/quarters/end", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.EndCtrl.run;
	}
]);