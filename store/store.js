/**
 * 实例化vuex
 */
// import vue and vuex
import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

// 实例化vuex
const store = new vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {},
})

// 导出
export default store
