<template>
	<view class="my-search-container">
		<view class="search-box">
			<uni-icons type="search"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		background-color: #c00000;
		height: 50px;
		padding: 0 20rpx;
		display: flex;
		align-items: center;

		.search-box {
			background-color: #fff;
			border-radius: 15px;
			height: 30px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 26rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
