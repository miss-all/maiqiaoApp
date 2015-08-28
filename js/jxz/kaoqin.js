var myApp = angular.module('myApp', []);
myApp.fn = {};
myApp.controller('kaoqinCtrl', ['$scope', "$http",
	function($scope, $http, $watch) {
		$scope.isWaiting = true;
		myApp.fn.kaoqinCtrl = {
			run: function(oid) {
				$scope.isWaiting = true;
				restService.Aget($http, "/" + oid + "/checks", {}, function(response) {
					$scope.data = response;
					$scope.isWaiting = false;
				});
			}
		}
		$scope.run = myApp.fn.kaoqinCtrl.run;
	}
]);

mui.checkFn(".mui-content", ".qxBtn", {
	".weidaoBtn": function(item) {
		tapBtn(item, '未到')
	},
	".qingjiaBtn": function(item) {
		tapBtn(item, '请假')
	},
	".chidaoBtn": function(item) {
		tapBtn(item, '迟到')
	},
	".yidaoBtn": function(item) {
		tapBtn(item, '已到')
	}
});

function tapBtn(item, str) {
	var jianliIds = "";
	mui.each(item, function(i, e) {
		if (i != 0) {
			jianliIds += "," + e.getAttribute("ngoid");
		} else {
			jianliIds += e.getAttribute("ngoid");
		}
	});
	restService.post("/" + oid + "/check", {
		'jianliIds': jianliIds,
		'state': str
	}, function(d) {
		myApp.fn.kaoqinCtrl.run(oid)
	})
	console.log(jianliIds)
}