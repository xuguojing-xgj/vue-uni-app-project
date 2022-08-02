import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//  导入请求配置文件
import '@/common/request.js'

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
