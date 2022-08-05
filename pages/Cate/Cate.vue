<template>
	<view>
		<view class="scroll-view-cantainer">
			<!-- 左侧滚动视图 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<!-- left-scroll-item active -->
				<view :class="['left-scroll-item', i === active ? 'active' : '']" v-for="(item,i) in cateList"
					:key="item.cat_id" @click="changeTab(i)">{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滚动视图 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<view>
					<view class="cate-l2-title">
						
					</view>
				</view>
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
				active: 0, // 伪元素
				cateLevel2: [], // 二级分类数据
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
				this.cateLevel2 = res.message[0].children
				console.log(res)
			},
			// 切换tab
			changeTab(val) {
				console.log(val)
				this.active = val
				// 将每个active 类 数据赋值 给二级分类
				this.cateLevel2 = this.cateList[val].children
				console.log(this.cateList[val].children)
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
			background-color: #f7f7f7;

			// 添加 active 类
			&.active {
				background-color: #FFFFFF;
				position: relative;

				// active类 切换时 加上伪元素
				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
