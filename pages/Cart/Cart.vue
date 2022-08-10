<template>
	<view>
		<!-- 购物车图标 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车列表区域 -->
		<block v-for="(goods, i) in cart" :key="i">
			<my-goods :goods="goods" :showNum="true" :showRadio="true" @radio-change="radioChangeFn"></my-goods>
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
			...mapMutations('m_cart', ['updateGoodsState']),
			// 监听单选组件状态的最新变化
			radioChangeFn(goodsInfo) {
				this.updateGoodsState(goodsInfo)
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
