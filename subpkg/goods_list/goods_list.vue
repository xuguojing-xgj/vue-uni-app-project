<template>
	<view>
		商品列表
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数
				queryObj: {
					query: '', //查询关键字
					cid: '', // 分类id
					pagenum: 1, // 页码
					pageSize: 10, // 每次请求的条数
				},
				goodsList: [], // 商品列表
				total: 0, // 商品列表总条数
			};
		},
		onLoad(options) {
			console.log(options)
			// 获取参数
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			// 调用获取商品列表数据 方法
			this.getGoodsList()
		},

		methods: {
			// 获取商品列表数据 方法
			async getGoodsList() {
				const {
					data: res
				} = await uni.$http.get('/goods/search', this.queryObj)
				if (res.meta.status != 200) return uni.$showMsg()
				this.goodsList = res.message.goods
				this.total = res.message.total
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">

</style>
