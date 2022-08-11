/**
 * mixins : 作用
 * 抽取组件中可复用的代码: data watch methods 生命钩子函数 computed
 */


import {
	mapGetters
} from 'vuex'
export default {
	onShow() {
		// 调用设置 tabBar 徽章的方法
		this.setBadge()
	},
	methods: {
		// 设置 tabBar 徽章的方法
		setBadge() {
			// 调用 api 设置徽章
			uni.setTabBarBadge({
				index: 2,
				text: this.total + '' // 参数必须是 string 类型
			})
		}
	},
	watch: {
		total() {
			this.setBadge()
		}
	},
	computed: {
		...mapGetters('m_cart', ['total'])
	}
}
