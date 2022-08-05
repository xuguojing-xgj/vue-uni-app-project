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
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<!-- 每一个二级分类 -->
				<view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="item.cat_id">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">
						/ {{item.cat_name}} /
					</view>
					<!-- 三级分类 -->
					<view class="cate-lv3-list">
						<!-- 三级分类每一项 -->
						<view class="cate-lv3-item" v-for="(item2,i) in item.children" :key="item2.cat_id">
							<image :src="item2.cat_icon"></image>
							<text>{{item2.cat_name}}</text>
						</view>

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
				scrollTop: 0, // 当点击一级分类时三级分类数据在顶部显示(优化)
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
				
				// this.scrollTop = 0 
				this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
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

		.right-scroll-view {

			// 二级标题字体样式
			.cate-lv2-title {
				text-align: center;
				font-size: 24rpx;
				font-weight: bold;
				margin: 20rpx 0rpx;
			}

			// 三级分类样式
			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 24rpx;

				.cate-lv3-item {
					display: flex;
					// 排列盒子内容 从上到下
					flex-direction: column;
					width: 33.3%;
					justify-content: center;
					align-items: center;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
</style>
