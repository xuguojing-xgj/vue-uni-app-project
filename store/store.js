/**
 * 实例化vuex
 */
// import vue and vuex
import vue from 'vue'
import vuex from 'vuex'

// 导入 cart.js 购物车模块
import moduleCart from './cart.js'
vue.use(vuex)

// 实例化vuex
const store = new vuex.Store({
	// state: {},
	// // Mutation 必须是同步函数
	// mutations: {},
	// Action 可以包含任意异步操作。
	// actions: {},
	// getters: {},
	modules: {
		m_cart: moduleCart, //挂载购物车模块
	},
})

// 导出
export default store
