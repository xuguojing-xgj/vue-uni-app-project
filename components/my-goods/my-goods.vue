<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio v-if="showRadio" :checked="goods.goods_status" color="#c00000" @click="radioChangeHandler"/>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>

		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">
					{{goods.goods_price | tofixed}}
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				required: true
			},
			showRadio: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			}
		},
		filters: {
			// 保留两位小数点
			tofixed(price) {
				return Number(price).toFixed(2)
			}
		},
		methods: {
			// 像组件使用者发送	事件 以及传递数据
			radioChangeHandler() {
				this.$emit('radio-change', {
					goods: this.goods.goods_id, // id
					goodsState: !this.goods.goods_status // 最新状态
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			// <!-- 添加 radio 2： 设置样式 -->
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
s
