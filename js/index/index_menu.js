var aniShow = "slide-in-right";
//关于backbutton和menubutton两个按键的说明，在iOS平台不存在，故需隐藏
if (!mui.os.android) {
	aniShow = "pop-in";
}
var subWebview = null,
	template = null,
	index = null;
mui.plusReady(function() {
	//获得主页面webview引用；
	index = plus.webview.currentWebview().opener();
});
/*加载webView页面*/
document.getElementById("companyEdit").addEventListener("tap", function() {
	var id = this.getAttribute("data-href");
	var href = this.getAttribute("data-href");

	if (id) {
		var webview_style = {
			popGesture: "close"
		};
		mui.openWindow({
			id: id,
			url: href,
			styles: webview_style,
			show: {
				autoShow: false,
				aniShow: aniShow
			},
			waiting: {
				autoShow: true
			}
		});
	}
})
mui('.mui-table-view').on('tap', '.open', function() {
	var id = this.getAttribute("data-href");
	var href = this.getAttribute("data-href");

	if (id) {
		var webview_style = {
			popGesture: "close"
		};
		mui.openWindow({
			id: id,
			url: href,
			styles: webview_style,
			show: {
				//				autoShow: false,
				aniShow: aniShow
			},
			waiting: {
				//				autoShow: false 
			}
		});
	}
});
/**
 * 关闭侧滑菜单
 */
function close() {
	mui.fire(mui.currentWebview.opener(), "menu:close");
};
//点击“关闭侧滑菜单”按钮处理逻辑
document.getElementById("close-btn").addEventListener("tap", close);
//在android4.4.2中的swipe事件，需要preventDefault一下，否则触发不正常
window.addEventListener('dragstart', function(e) {
	mui.gestures.touch.lockDirection = true; //锁定方向
	mui.gestures.touch.startDirection = e.detail.direction;
});
window.addEventListener('dragleft', function(e) {
	if (!mui.isScrolling) {
		e.detail.gesture.preventDefault();
	}
});
//监听左滑事件，若菜单已展开，左滑要关闭菜单；
window.addEventListener("swipeleft", function(e) {
	if (Math.abs(e.detail.angle) > 165) {
		close();
	}
});