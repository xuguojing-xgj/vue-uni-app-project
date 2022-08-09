<template>
	<view>
		<view class="goods-list">
			<!--  block 不是一个组件，就是一个标签，这个标签一般就是配置 渲染和跳转判断来使用的 -->
			<block v-for="(goods, i) in goodsList" :key="i">
				<my-goods :goods="goods"></my-goods>
			</block>
		</view>
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
		// 页面上拉触底事件函数处理
		onReachBottom() {
			// 页码加1
			this.queryObj.pagenum += 1
			// 再次请求数据
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表数据 方法
			async getGoodsList() {
				const {
					data: res
				} = await uni.$http.get('/goods/search', this.queryObj)
				if (res.meta.status != 200) return uni.$showMsg()
				// 让上一页的数据 跟最新的数据合并 才能够在页面展示
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">

</style>
