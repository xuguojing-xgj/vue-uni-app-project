<template>
	<view>
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 购物车图标 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车列表区域 -->
		<block v-for="(goods, i) in cart" :key="i">
			<my-goods :goods="goods" :showNum="true" :showRadio="true" @radio-change="radioChangeFn"
				@num-change="numChangeFn"></my-goods>
		</block>
	</view>
</template>

<script>
	import tabBarMixin from '../../mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [tabBarMixin],
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
			// 监听单选组件状态的最新变化
			radioChangeFn(goodsInfo) {
				this.updateGoodsState(goodsInfo)
			},
			// 侦听数字输入框的变化
			numChangeFn(goodsInfo) {
				// 购物车-解决 NumberBox 数据不合法的问题 源码
				// let value = parseInt(event.detail.value);
				// if (isNaN(value)) {
				// 	this.inputValue = this.min;
				// 	return;
				// }
				this.updateGoodsCount(goodsInfo)
			}
		},
		computed: {
			...mapState('m_cart', ['cart'])
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
</style>
