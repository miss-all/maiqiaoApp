/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		var settings = owner.getSettings();
		if (loginInfo === null) {  //如果settings也为空需要返回登陆界面在登陆
			loginInfo = settings.token;
			console.log("loginInfo is null:" + JSON.stringify(loginInfo))
		}
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}

		Slogin(loginInfo, function(authed) {
			if (authed) {
				settings.account = authed;
				settings.token = loginInfo;
				owner.setSettings(settings);
				return callback();
			} else {
				return callback('用户名或密码错误');
			}
		})
	};

	function Slogin(loginInfo, callback) {
		mui.ajax(config.host + "/login", {
			data: {
				"username": loginInfo.account,
				"password": loginInfo.password
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			success: function(data) {
				console.log("login" + JSON.stringify(data));
				if ((data.jsonObject && data.jsonObject.code == 200) || data.user) {
					callback(data);
				} else {
					callback(null);
				}
			},
			error: function(xhr, type, errorThrown) {
				console.log("login error:" + xhr + type + errorThrown);
				callback(null);
			}
		});
	}

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
}(mui, window.app = {}));