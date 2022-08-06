<template>
	<view>
		<!-- bgColor="#c00000" 直接使用组件内置的属性修改 -->
		<view class="search-box">
			<uni-search-bar :radius="20" cancelButton="none" @input="input" @confirm="confirm"></uni-search-bar>
		</view>
		<!-- 搜索建议列表区域 -->
		<view class="sugg-list" v-if="searchResults.length != 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="item.goods_id">
				<view class="sugg-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="12"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区域 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" @click="deleteTrash"></uni-icons>
			</view>
			<!-- 历史记录 -->
			<view class="history-list">
				<view class="history-item" v-for="(item,i) in history" :key="i" @click="goToGoodsList(item)">
					<uni-tag :text="item" />
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
				historyList: JSON.parse(uni.getStorageSync('keyword') || '[]'), // 搜索历史记录
			};
		},
		methods: {
			// 点击删除图标时清空历史搜索记录
			deleteTrash() {
				uni.removeStorageSync('keyword')
				this.historyList = []
				
			},
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
			},
			// 当点击搜索框时,  用户按下回车触发事件
			confirm(e) {
				if (e.value.trim().length === 0) {
					this.searchResults = []
					return
				}
				// 调用将数据存到本地的方法
				this.saveSearchHistory()
			},
			// 将数据存到本地 方法
			saveSearchHistory() {
				// unshift() 解决搜索历史顺序前后问题
				this.historyList.push(this.keyword)
				// set 去重
				const set = new Set(this.historyList)
				this.historyList = Array.from(set)

				// 使用uni.setStorageSync 将搜索历史数据持久化
				uni.setStorageSync('keyword', JSON.stringify(this.historyList))
			},
			// 点击历史记录跳转到相应的商品页面
			goToGoodsList(val) {
				console.log(val)
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + val
				})
			}
		},
		computed: {
			history() {
				//  不改变原数组的情况下 使用计算属性 解决搜索历史前后顺序问题 
				//  调用 reverse方法 反转 会影响原数组 
				//  将 [...this.historyList] 拷贝 一份就不会影响到原数组
				return [...this.historyList].reverse()
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

	.history-box {
		.history-title {
			display: flex;
			// 两边对齐 中间等距
			justify-content: space-between;
			padding: 12rpx 12rpx;
			font-size: 26rpx;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.history-item {
				margin: 24rpx 0rpx 0rpx 24rpx;
			}

			// uni-tag {
			// 	margin-left: 24rpx;
			// 	margin-bottom: 24rpx;
			// }
		}
	}
</style>
