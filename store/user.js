/**
 * 存储跟用户有关的数据
 *  
 */
export default {
	// 开启命名空间
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'), // 收货地址
	}),
	mutations: {
		// 更新收货地址的方法
		updateAddress(state, address) {

			state.address = address
			// 在对 address 赋值后 将收货地址保存到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 将购物车商品存储带本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		addStr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address
			if (!provinceName) return ''
			return provinceName + cityName + countyName + detailInfo
		}
	}
}
