<template>
	<view>
		<view class="scroll-view-cantainer">
			<!-- 左侧滚动视图 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
				<view>左侧模板</view>
			</scroll-view>
			<!-- 右侧滚动视图 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
				<view>右侧模板</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0, // 当前系统窗口可用高度
			};
		},
		onLoad() {
			// 获取当前系统可用高度
			const systemInfo = uni.getSystemInfoSync()
			this.wh = systemInfo.windowHeight
		}
	}
</script>

<style lang="scss">
	.scroll-view-cantainer {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}
	}
</style>
