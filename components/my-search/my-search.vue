<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<view class="search-box" :style="{'border-radius': radius + 'px'}" @click="searchHandler">
			<uni-icons type="search"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			// 背景颜色
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			// 圆角
			radius: {
				type: Number,
				default: 16
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchHandler() {
				this.$emit('searchCilck')
			}
		}
	}
</script>

<style lang="scss">
	// 背景样式
	.my-search-container {
		// background-color: #c00000;
		height: 50px;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		// 搜索盒子样式
		.search-box {
			background-color: #fff;
			// border-radius: 15px;
			height: 30px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			// 文本样式
			text {
				font-size: 26rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
