/**
 * 配置网络请求的方法
 */

// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'



// 配置请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	wx.showLoading({
		title: '数据加载中...',
	})
}

// 响应拦截 请求完成之后做一些事情
$http.afterRequest = function() {
	wx.hideLoading()
}

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
