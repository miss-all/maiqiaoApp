var myApp = angular.module('myApp', []);
myApp.fn = {};
myApp.controller('jianliCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.jianliCtrl = {
			run: function(oid) {
				restService.Aget($http, "/" + oid + "/partjobs", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.jianliCtrl.run;
	}
])