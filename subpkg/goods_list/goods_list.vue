<template>
	<view>
		<view class="goods-list">
			<!--  block 不是一个组件，就是一个标签，这个标签一般就是配置 渲染和跳转判断来使用的 -->
			<block v-for="(goods, i) in goodsList" :key="i">
				<view class="goods-item">

					<view class="goods-item-left">
						<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
					</view>

					<!-- 商品右侧信息区域 -->
					<view class="goods-item-right">
						<!-- 商品标题 -->
						<view class="goods-name">
							{{goods.goods_name}}
						</view>
						<view class="goods-info-box">
							<!-- 商品价格 -->
							<view class="goods-price">
								{{goods.goods_price}}
							</view>

						</view>
					</view>
				</view>
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
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			// <!-- 添加 radio 2： 设置样式 -->
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
