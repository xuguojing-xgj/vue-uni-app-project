<template>
	<view>
		<view class="goods-list">
			<!--  block 不是一个组件，就是一个标签，这个标签一般就是配置 渲染和跳转判断来使用的 -->
			<view v-for="(goods, i) in goodsList" :key="i" @click="goToGoodsDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
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

		// 监听页面下拉刷新
		onPullDownRefresh() {
			console.log('监听下拉刷新')
			// 重置数据
			this.queryObj.pagenum = 1
			this.goodsList = []
			this.total = 0
			this.isLoading = false

			// 重新请求数据
			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 点击item 跳转到对应的商品详情
			goToGoodsDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 获取商品列表数据 方法
			async getGoodsList(callback) {
				console.log(callback)
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
				// 数据请求完成之后 取消下拉刷新
				callback && callback()
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">

</style>
