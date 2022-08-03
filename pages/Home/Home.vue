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
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层导航区域 -->
		<view class="floor-list">
			<!-- 每个楼层的item 结构 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题区域 -->
				<image :src="item.floor_title.image_src"></image>
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
				floorList: [], // 楼层导航
			};
		},
		//  页面加载时 显示的数据
		onLoad() {
			// 调用获取轮播图数据 方法
			this.getSwiperList()
			// 调用获取分类数据 方法
			this.getNavList()
			// 调用获取楼层导航的数据 方法
			this.getFloorList()
		},
		methods: {
			// 调用轮播图接口 发送网络请求
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
			// 调用导航 接口获取数据
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
			},
			// 分类点击事件
			navClickHandler(val) {
				console.log(val)
				if (val.name == '分类') {
					// switchTab 跳转到 tabBar 页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 调用楼层导航接口 获取数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/home/floordata')
				console.log(res)
				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据获取失败",
						icon: "none"
					})
				}
				// 赋值数据
				this.floorList = res.message
			}
		},

	}
</script>

<style lang="scss">
	// 轮播图样式
	swiper {
		height: 350rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%;
		}
	}

	// 导航样式
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

	// 楼层样式
	.floor-list {
		margin-top: 12rpx;

		.floor-item {
			image {
				width: 100%;
				height: 60rpx;
			}
		}
	}
</style>
