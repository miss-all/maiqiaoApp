/*config*/
var config = {
	host: "http://192.168.1.11:8084/maiqiao",
	getUrl: function(s) {
		return config.host += s;
	},
	aniShow: "slide-in-right"
};
/*global*/
if (!mui.os.android) {
	config.aniShow = "pop-in";
};

function listentHref(c, opt) { //传递主类，并且点击的链接加上class=open
	if (!opt) {
		opt = function() {
			return {}
		};
	}
	mui.plusReady(function() {
		c.on('tap', '.open', function() {
			var e = this;
			var id = this.getAttribute("data-href");
			var href = this.getAttribute("data-href");

			console.log(id)
			if (id) {
				mui.openWindow({
					id: id,
					url: href,
					styles: {
						popGesture: "close"
					},
					show: {
						aniShow: config.aniShow
					},
					waiting: {
						//						autoShow: false
					},
					extras: opt(e)
				});
			}
		});
	})
};
/*restService*/
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
					app.login(null, function(err) {
						if (!err) {
							service.get(url, data, callback);
						}
					});
				}
			}
		});
	};
	/**
	 * post methon
	 **/
	service.post = function(url, data, callback) {
		mui.ajax(config.host + url, {
			data: data,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				callback(data)
			},
			error: function(xhr, type, errorThrown) {
				var data = JSON.parse(xhr.response)
				if (data.code == -1) {
					app.login(null, function(err) {
						if (!err) {
							service.post(url, data, callback);
						}
					});
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
			params: data
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
(function($) {
	$.checkFn = function(f, qx, btns) {
		var sAll = true;
		var $bar = $(".checkBtnBar")[0];
		$bar.style.display = "none";
		$(qx)[0].addEventListener("tap", function() {
			$checks = selectAll()
			$checks.each(function(i, e) {
				e.checked = sAll;
			})
			sAll = !sAll;
			displayBar();
		})
		$.each(btns, function(i, o) {
			$(i)[0].addEventListener("tap", function() {
				o(selectChecks());
			})
		});
		$(f).on("tap", ".check", function(e) {
			var iup = this.children[0];
			if (iup && iup.tagName == "INPUT") {
				iup.checked = !iup.checked;

				displayBar();
			}

			e.stopPropagation()
		})


		function displayBar() {
			var all = selectChecks()
			if (all.length > 0) {
				$bar.style.display = "block";
			} else {
				$bar.style.display = "none";
			}
		}

		function selectChecks() {
			var item = new Array();
			$checks = selectAll()
			$checks.each(function(i, e) {
				if (e.checked) {
					item.push(e);
				}
			})
			return item;
		}

		var $checksF;

		function selectAll() {
			return $(f + " .check>input");
		}
		return this;
	}
})(mui)