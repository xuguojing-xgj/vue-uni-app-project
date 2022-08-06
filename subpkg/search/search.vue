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
					console.log(this.keyword)
				}, 800)
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
