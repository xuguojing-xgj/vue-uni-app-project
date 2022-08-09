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
				isLoading: false, // 设置节流阀 数据是否正在请求中

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
			// 数据正在请求时... 不去加载下一页内容
			if (this.isLoading) return
			// 判断数据是否加载完毕, 加载完毕给用户提示
			// this.goodsList.length 
			if (this.queryObj.pagenum * this.queryObj.pageSize >= this.total) {
				return uni.$showMsg('数据加载完成~')
			}
			// 页码加1
			this.queryObj.pagenum += 1
			// 再次请求数据
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表数据 方法
			async getGoodsList() {
				// 将 loading 设置为 true 表示数据正在请求中....
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/goods/search', this.queryObj)
				if (res.meta.status != 200) return uni.$showMsg()
				// 将 loading 设置为 false 数据请求结束
				this.isLoading = false
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
