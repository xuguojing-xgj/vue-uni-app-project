<template>
	<view><template>
			<view>
				<!-- 选择收货地址的盒子 -->
				<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
					<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
				</view>

				<!-- 渲染收货信息的盒子 -->
				<view class="address-info-box" >
					<view class="row1">
						<view class="row1-left">
							<view class="username">收货人：<text>{{ address.userName }}</text></view>
						</view>
						<view class="row1-right">
							<view class="phone">电话：<text>{{ address.telNumber }}</text></view>
							<uni-icons type="arrowright" size="16"></uni-icons>
						</view>
					</view>
					<view class="row2">
						<view class="row2-left">收货地址：</view>
						<view class="row2-right">{{ addStr }}</view>
					</view>
				</view>

				<!-- 底部的边框线 -->
				<image src="/static/cart_border@2x.png" class="address-border"></image>
			</view>
		</template>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				address: {}, // 收货地址
			}
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			// 获取收货地址
			async chooseAddress() {
				// 2022 年 7 月 14 日起, 使用地理位置相关接口时需要提前在 app.json 中进行配置。
				// "requiredPrivateInfos": ["chooseAddress"] 
				//  解决不能跳转到原生收货地址问题
				const [err, res] = await uni.chooseAddress().catch(err => err)
				if (err === null && res.errMsg === 'chooseAddress:ok') {
					// this.address = res
					this.updateAddress(res)
				}
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			// 拼接收货地址
			...mapGetters('m_user', ['addStr'])
		}

	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 渲染收货信息的盒子
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>
