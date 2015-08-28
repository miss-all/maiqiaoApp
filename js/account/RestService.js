/**
 * “基于服务端Service” 的实现。
 **/
(function($, service) {
	/**
	 * get methon
	 **/
	service.get = function(url, data, callback) {
		mui.ajax(config.host + url, {
			data: data,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				callback(data)
			},
			error: function(xhr, type, errorThrown) {
				var data = JSON.parse(xhr.response)
				if (data.code == -1) {
					console.log(data.message)
					app.login();
					service.get(url, data, callback);
				}
			}
		});
	};

	service.Aget = function($http, url, data, callback) {
		$http({
			method: "get",
			'url': config.host + url,
			params: data
		}).success(function(response) {
			callback(response)
		}).error(function(data) {
			console.log("service error" + JSON.stringify(data));
			if (data.code == -1) {
				app.login(null, function(err) {
					if (!err) {
						service.Aget($http, url, data, callback);
					}
				});
			}
		});
	}
	service.Apost = function($http, url, data, callback) {
		$http({
			method: "post",
			'url': config.host + url,
			data: data
		}).success(function(response) {
			callback(response)
		}).error(function(data) {
			console.log("service error" + JSON.stringify(data));
			if (data.code == -1) {
				app.login(null, function(err) {
					if (!err) {
						service.Apost($http, url, data, callback);
					}
				});
			}
		});
	}
}(mui, window.restService = {}));