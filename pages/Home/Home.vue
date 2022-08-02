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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图
			};
		},
		//  页面加载时 显示的数据
		onLoad() {
			this.getSwiperList()
		},
		methods: {
			// 调用接口 发送网络请求
			async getSwiperList() {
				const { data : res } = await uni.$http.get('/home/swiperdata')
				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据获取失败",
						icon: "none"
					})
				}
				// 赋值数据
				this.swiperList = res.message
				console.log(res)
			}
		}
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
</style>
