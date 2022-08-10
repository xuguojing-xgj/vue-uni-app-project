<template>
	<view>
		<view class="search-box">
			<my-search @searchCilck="goToSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
				<!-- 声明式导航 -->
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
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
				<!-- 商品图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧盒子 -->
					<navigator :url="item.product_list[0].url" class="left-img-box">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧盒子 -->
					<view class="right-img-box">
						<navigator :url="itemName.url" class="img-box" v-for="(itemName, i) in item.product_list"
							v-if="i != 0" :key="i">
							<!-- mode="widthFix" 宽度不变 高度自适应 保持图片 原比例 -->
							<image :src="itemName.image_src" :style="{width:itemName.image_width  + 'rpx'}"
								mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import tabBarMixin from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [tabBarMixin],
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
				if (res.meta.status != 200) return uni.$showMsg()
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
				if (res.meta.status != 200) return uni.$showMsg()
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
				if (res.meta.status != 200) return uni.$showMsg()
				// 对数据 进行处理
				res.message.forEach((item) => {
					// console.log(item)
					item.product_list.forEach((itemVal) => {
						itemVal.url = '/subpkg/goods_list/goods_list?' + itemVal.navigator_url.split(
							'?')[1]
					})
				})
				// 赋值数据
				this.floorList = res.message
			},
			// 自定义搜索事件, 点击搜索时跳转到搜索页面
			goToSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
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

		// 商品区域
		.floor-img-box {
			display: flex;
			padding: 0rpx 12rpx;

			.right-img-box {
				display: flex;
				// 多行换行
				flex-wrap: wrap;
			}

			.img-box {
				padding-left: 6rpx;
			}
		}
	}

	// 搜索吸顶效果
	.search-box {
		// 利用定位实现效果
		position: sticky;
		top: 0;
		// 设置显示权限 防止被轮播图覆盖
		z-index: 999;
	}
</style>
