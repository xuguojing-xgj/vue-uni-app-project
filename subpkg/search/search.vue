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

			};
		},
		methods: {
			// 当输入框发生改变时 触发事件
			input(e) {
				console.log(e)
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
