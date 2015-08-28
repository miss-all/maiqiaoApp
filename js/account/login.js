(function($, doc) {
	$.init({
		statusBarBackground: '#f7f7f7'
	});
	$.plusReady(function() {
		plus.screen.lockOrientation("portrait-primary");
		var settings = app.getSettings();
		var mainPage = $.preload({
			"id": 'index',
			"url": 'index.html'
		});
		var toMain = function() {
			$.fire(mainPage, 'show', null);
			setTimeout(function() {
				$.openWindow({
					id: 'index',
					"url": 'index.html',
					show: {
						aniShow: 'pop-in'
					},
					waiting: {
						autoShow: false
					}
				});
				plus.webview.currentWebview().hide()
			}, 10);
		};
		//检查 "登录状态/锁屏状态" 开始
		if (settings.account && settings.token) {
			console.log("account and token : " + JSON.stringify(settings))
			toMain();
		} 

		// close splash
		setTimeout(function() {
			//关闭 splash
			plus.navigator.closeSplashscreen();
		}, 600);
		//检查 "登录状态/锁屏状态" 结束
		var loginButton = doc.getElementById('login');
		var accountBox = doc.getElementById('account');
		var passwordBox = doc.getElementById('password');
		loginButton.addEventListener('tap', function(event) {
			var loginInfo = {
				account: accountBox.value,
				password: passwordBox.value
			};
			app.login(loginInfo, function(err) {
				if (err) {
					plus.nativeUI.toast(err);
					return;
				}
				toMain();
			});
		});

		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
}(mui, document));