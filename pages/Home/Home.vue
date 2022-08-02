<template>
	<view>
		首页
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
			async getSwiperList() {
				const {
					datat: res
				} = uni.$http.get('/home/swiperdata')

				if (res.meta.status != 200) {
					return uni.showToast({
						title: "数据获取失败",
						icon: "none"
					})
				}
				this.swiperList = res.message
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">

</style>
