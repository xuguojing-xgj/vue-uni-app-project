import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//  导入请求配置文件
import '@/common/request.js'
// 导入封装的通用模板
import '@/common/utils.js'
// 导入 vuex 实例化
import store from './store/store.js'
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
