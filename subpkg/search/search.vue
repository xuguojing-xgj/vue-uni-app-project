<template>
	<view>
		<!-- bgColor="#c00000" 直接使用组件内置的属性修改 -->
		<uni-search-bar :radius="20" cancelButton="none" @input="input" @confirm="confirm"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null, // 定时器
				keyword: '', // 用户输入的关键字
				searchResults: [], // 用户搜索建议列表数据
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

</style>
