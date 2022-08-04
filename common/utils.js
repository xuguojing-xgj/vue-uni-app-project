/**
 * 项目中通用函数封装
 */

// 错误消息提示
uni.$showMsg = function(title = "数据获取失败", duration = 1500) {
	return uni.showToast({
		title,
		duration,
		icon: "none"
	})
}
