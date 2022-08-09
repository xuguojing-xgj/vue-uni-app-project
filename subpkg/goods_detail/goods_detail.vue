<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="goods_info.goods_price">
			<!-- 商品价格 -->
			<view class="price">￥{{ goods_info.goods_price }}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>

		<!-- 商品详情信息 -->
		<!-- rich-text 是渲染富文本的一个组件 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 商品导航区域 -->
		<view class="uni-goods-nav">
			<!--fill 让右侧按钮变成圆角  -->
			<!-- 使用 uni-ui 提供的商品导航组件 -->
			<!-- fill 设置按钮的样式为椭圆形 -->
			<!-- options 配合左侧区域的结构 -->
			<!-- buttonGroup 配置右侧按钮 -->
			<!-- @click 左侧区域的点击事件 -->
			<!-- @buttonClick 右侧区域的点击事件 -->
			<uni-goods-nav :fill="true" :buttonGroup='buttonGroup' :options='options' @click="leftClick"
				@buttonClick="rightClick">
			</uni-goods-nav>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {}, // 商品详情
				// options 配置的是商品导航区域的选项
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 7 // 购物车商品的数量
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			// 拿到跳转过来的商品 id
			const goods_id = options.goods_id

			// 调用获取商品详情数据的方法
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 轮播图预览功能
			preview(val) {
				console.log(val)
				uni.previewImage({
					current: val,
					urls: this.goods_info.pics.map(item => item.pics_big)
				})
			},
			// 商品左侧点击事件
			leftClick(e) {
				console.log(e)
				if (e.content.text == '购物车') {
					// 	跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			// 商品右侧点击事件
			rightClick(e) {

			},

			// 获取商品详情数据的方法
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/goods/detail', {
					goods_id
				})
				if (res.meta.status != 200) return uni.$showMsg()
				console.log(res)
				// 解决信息详情区域底部照片有空白间隙问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/webp /g, 'jpg')
				this.goods_info = res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}


	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
</style>
