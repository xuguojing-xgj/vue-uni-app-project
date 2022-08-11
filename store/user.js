/**
 * 存储跟用户有关的数据
 *  
 */
export default {
	// 开启命名空间
	namespaced: true,
	state: () => ({
		address: {}, // 收货地址
	}),
	mutations: {
		// 更新收货地址的方法
		updateAddress(state, address) {
			console.log(state)
			console.log(address)
			state.address = address
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
