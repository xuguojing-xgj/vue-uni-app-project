<template>
	<view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
				<view class="swiper-item">
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i">
				<image :src="item.image_src"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图
				navList: [], // 分类导航
			};
		},
		//  页面加载时 显示的数据
		onLoad() {
			// 调用获取轮播图数据 方法
			this.getSwiperList()
			// 调用获取分类数据 方法
			this.getNavList()
		},
		methods: {
			// 调用接口 发送网络请求
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/home/swiperdata')
				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据获取失败",
						icon: "none"
					})
				}
				// 赋值数据
				this.swiperList = res.message
				// console.log(res)
			},
			// 获取导航数据
			async getNavList() {
				// 解构赋值
				const {
					data: res
				} = await uni.$http.get('/home/catitems')
				console.log(res)
				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据获取失败",
						icon: "none"
					})
				}
				// 赋值操作
				this.navList = res.message
			}
		},

	}
</script>

<style lang="scss">
	swiper {
		height: 350rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-list {
		display: flex;
		// 两边对齐中间等距
		justify-content: space-around;
		margin-top: 12rpx;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
</style>
