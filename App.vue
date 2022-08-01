<script>
	// App.vue 中的js 区域 , 最终会被解析为 app.js 
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style >
	//  App.vue 中的style 区域 最终会被解析为 app.wxss 文件 作用域每个页面	
	/*每个页面公共css */
</style>
