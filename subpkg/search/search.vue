<template>
	<view>
		<!-- bgColor="#c00000" 直接使用组件内置的属性修改 -->
		<view class="search-box">
			<uni-search-bar :radius="20" cancelButton="none" @input="input" @confirm="confirm"></uni-search-bar>
		</view>

		<!-- 搜索建议列表区域 -->
		<view class="sugg-list">

			<!-- 建议列表 -->
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="item.goods_id">
				<view class="sugg-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="12"></uni-icons>
			</view>


			<view class="hostory-box">
				<!-- 搜索历史 -->
				<view class="hostory-title">
					<text>搜索历史</text>
					<uni-icons type="trash"></uni-icons>
				</view>

				<!-- 历史记录 -->
				<view class="hostory-list">
					<uni-tag v-for="(item,i) in hostoryList" :key="i" :text="item"></uni-tag>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, // 定时器
				keyword: '', // 用户输入的关键字
				searchResults: [], // 用户搜索建议列表数据
				hostoryList: ['java', 'Python', 'c++'], // 搜索历史记录
			};
		},
		methods: {
			// 当输入框发生改变时 触发事件
			input(e) {
				// 清除 timeId 对应的延迟器
				clearTimeout(this.timer)
				// 重新启动一个延迟器, 并把  timeId 赋值给 this.timer
				this.timer = setTimeout(() => {
					this.keyword = e
					// console.log(this.keyword)
					// 调用获取用户搜索列表建议数据方法
					this.getSearchList()
				}, 800)
			},
			// 获取用户搜索列表建议数据
			async getSearchList() {
				// 判断输入框长度是否为 0
				if (this.keyword.trim().length === 0) {
					this.searchResults = []
					return
				}
				// 请求数据
				const {
					data: res
				} = await uni.$http.get('/goods/qsearch', {
					query: this.keyword
				})
				if (res.meta.status != 200) return uni.$showMsg()
				this.searchResults = res.message
				console.log(res)
				console.log(this.keyword.trim().length)
			},
			// 当点击搜索框时,  用户按下回车触发事件
			confirm(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	// 搜索框吸顶
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	// 搜素建议列表样式
	.sugg-list {
		.sugg-item {
			display: flex;
			padding: 13px 6px;
			border-bottom: 1px solid #efefef;

			.sugg-name {
				font-size: 26rpx;
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后使用 ... 代替
				text-overflow: ellipsis;
			}
		}
	}
	.hostory-box {
		.hostory-title{
			display: flex;
			// 两边对齐 中间等距
			justify-content: space-between;
			padding: 12rpx 12rpx;
			font-size: 26rpx;
			border-bottom: 1px solid #efefef;
		}
	}
</style>
