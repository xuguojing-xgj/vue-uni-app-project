<template>
	<view>
		<view class="scroll-view-cantainer">
			<!-- 左侧滚动视图 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view class="left-scroll-item" v-for="(item,i) in cateList" :key="item.cat_id">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右侧滚动视图 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
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
				cateList: [], // 获取分类数据
			};
		},
		onLoad() {
			// 获取当前系统可用高度
			const systemInfo = uni.getSystemInfoSync()
			this.wh = systemInfo.windowHeight
			// 调用分类方法
			this.getCateDate()
		},
		methods: {
			// 调用接口获取分类数据
			async getCateDate() {
				const {
					data: res
				} = await uni.$http.get('/categories')
				if (res.meta.status != 200) return uni.$showMsg()
				this.cateList = res.message
				console.log(this.cateList)
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-cantainer {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}

		.left-scroll-item {
			height: 60px;
			text-align: center;
			line-height: 60px;
			font-size: 24rpx;
		}
	}
</style>
