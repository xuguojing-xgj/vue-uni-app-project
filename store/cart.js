/**
 * 购物车模块
 */
export default {
	// 开启命名空间
	namespaced: true,
	// 共享数据
	state: () => ({
		// 存储购物车数据

		cart: [],
	}),
	// 对数据进行修改
	mutations: {
		// 将商品添加到购物车
		addToCart(state, goodsInfo) {
			console.log(state, goodsInfo)
		},
	},
	// 对数据格式化的计算属性
	getters: {

	},
}
